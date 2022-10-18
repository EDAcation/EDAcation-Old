import {deserializeState} from '../../serializable';
import {SerializedStorage, Storage, StorageDirectory, StorageFile} from '../../storage';
import {debug} from '../../util';

import {INDEX_DATA, INDEX_FS_LOCK, INDEX_WORKER_LOCK, INDEX_WORKER_NOTIFY, Operation} from './constants';
import {Data} from './data';
import {createStorageFS} from './emscripten-fs';
import {Mutex} from './mutex';

export interface EmscriptenWrapper {
    getFS(): typeof FS;
}

export interface ToolMessageInit {
    type: 'init';
    sharedBuffer: SharedArrayBuffer;
    portFs: MessagePort;
}

export interface ToolMessageStorage {
    type: 'storage';
    storage: SerializedStorage;
}

export interface ToolMessageCall {
    type: 'call';
    id: string;
    storageId: string;
    path: string[];
}

export type ToolMessage = ToolMessageInit | ToolMessageStorage | ToolMessageCall;

export abstract class WorkerTool<Tool extends EmscriptenWrapper> {

    private readonly id: number;

    private sharedBuffer: SharedArrayBuffer;
    private arrayInt32: Int32Array;
    private lockFs: Mutex;
    private lockWorker: Mutex;
    private data: Data;
    private portFs: MessagePort;

    private toolPromise: Promise<void>;
    protected tool: Tool;
    private fs: typeof FS;
    private storageFs: Emscripten.FileSystemType;

    private storages: Record<string, Storage<unknown, unknown>>;
    private isStorageMounted: Record<string, boolean>;

    constructor(id: number) {
        this.id = id;

        this.storages = {};
        this.isStorageMounted = {};

        this.toolPromise = (async () => {
            this.tool = await this.initialize();
        })();

        addEventListener('message', this.handleMessage.bind(this));
        addEventListener('messageerror', this.handleMessageError.bind(this));
    }

    handleMessage(event: MessageEvent<ToolMessage>) {
        switch (event.data.type) {
            case 'init': {
                this.init(event.data);
                break;
            }
            case 'storage': {
                this.updateStorage(event.data);
                break;
            }
            case 'call': {
                this.call(event.data);
                break;
            }
        }
    }

    handleMessageError(event: MessageEvent) {
        console.error('Failed to deserialize worker message.', event);
    }

    async init(message: ToolMessageInit) {
        this.sharedBuffer = message.sharedBuffer;
        this.arrayInt32 = new Int32Array(this.sharedBuffer);
        this.lockFs = new Mutex(this.arrayInt32, INDEX_FS_LOCK);
        this.lockWorker = new Mutex(this.arrayInt32, INDEX_WORKER_LOCK);
        this.data = new Data(this.sharedBuffer, INDEX_DATA * 4);
        this.portFs = message.portFs;

        // Ensure the tool is initialized
        if (!this.tool) {
            await this.toolPromise;
        }

        // Initialize file system
        this.fs = this.tool.getFS();
        this.storageFs = createStorageFS(this.fs, this);
        this.fs.mkdir('/storages');
        this.mountStorages();
    }

    async updateStorage(message: ToolMessageStorage) {
        // Deserialize storage
        const storage = deserializeState<Storage<unknown, unknown>>(message.storage);

        this.storages[storage.getID()] = storage;

        this.mountStorages();
    }

    mountStorages() {
        if (!this.fs) {
            return;
        }

        for (const storageId of Object.keys(this.storages)) {
            if (!this.isStorageMounted[storageId]) {
                const path = `/storages/${storageId}`;
                this.fs.mkdir(path);
                this.fs.mount(this.storageFs, {
                    storageId
                }, path);

                this.isStorageMounted[storageId] = true;
            }
        }
    }

    async call(message: ToolMessageCall) {
        const storage = this.storages[message.storageId];
        if (!storage) {
            throw new Error(`Unknown storage "${message.storageId}".`);
        }

        // Find the file in storage
        const file = await storage.getEntry(message.path);
        if (!(file instanceof StorageFile)) {
            throw new Error('Storage entry is not a file.');
        }

        // Ensure the tool is initialized
        if (!this.tool) {
            await this.toolPromise;
        }

        // Determine paths
        const directory = file.getParent();
        const filePath = `/storages/${file.getFullPath()}`;
        const directoryPath = `/storages/${directory.getFullPath()}`;

        // Execute the tool
        const result = await this.execute(filePath, file, directoryPath, directory);

        postMessage({
            id: message.id,
            result
        });
    }

    callFs(storageId: string, path: string[], operation: 'readdir'): string[];
    callFs(storageId: string, path: string[], operation: 'rmdir' | 'unlink'): void;
    callFs(storageId: string, path: string[], operation: 'stat'): [number, number];
    callFs(storageId: string, path: string[], operation: 'read', args: {start: number; end: number}): Uint8Array;
    callFs(storageId: string, path: string[], operation: 'truncate', args: {size: number}): void;
    callFs(storageId: string, path: string[], operation: 'write', args: {buffer: ArrayBuffer; start: number; end: number}): number;
    callFs(storageId: string, path: string[], operation: Operation, args?: Record<string, unknown>): unknown {
        debug('fs', `worker ${this.id} is waiting for lock...`);

        // Acquire worker lock
        this.lockWorker.acquire();

        debug('fs', `worker ${this.id} has lock`);

        // Acquire FS lock
        this.lockFs.acquire();

        this.portFs.postMessage({
            type: 'call',
            storageId,
            path,
            operation,
            ...args
        });

        // Release of FS lock
        this.lockFs.release();

        debug('fs', `worker ${this.id} is waiting for response...`);

        // Wait for worker notify
        Atomics.wait(this.arrayInt32, INDEX_WORKER_NOTIFY, 0);

        // Read response from data buffer
        this.data.resetOffset();

        let result: unknown;

        // Check if the response was an error
        const errorCode = this.data.readUint8();
        if (errorCode > 0) {
            throw new Error(`FS error: ${this.data.readString()}`);
        }

        // Read data
        switch (operation) {
            case 'readdir': {
                result = this.data.readStringArray();
                break;
            }
            case 'stat': {
                result = [this.data.readUint8(), this.data.readUint32()];
                break;
            }
            case 'read': {
                result = this.data.readUint8Array();
                break;
            }
            case 'truncate':
            case 'write': {
                break;
            }
        }

        // Clear data buffer
        this.data.clear();

        debug('fs', `worker ${this.id} received`, result);

        // Release worker lock
        this.lockWorker.release();

        debug('fs', `worker ${this.id} is done`);

        return result;
    }

    abstract initialize(): Promise<Tool>;

    abstract execute(
        filePath: string, file: StorageFile<unknown, unknown>, directoryPath: string, directory: StorageDirectory<unknown, unknown>
    ): Promise<string[]>;
}
