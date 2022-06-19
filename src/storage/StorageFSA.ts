import {getSerialId, serialize, deserialize, serializable} from '../serializable';

import {SerializedStorage, Storage, StorageDirectory, StorageEntry, StorageError, StorageFile} from './Storage';
import {StorageType} from './StorageType';

export type StorageEntryFSA = StorageEntry<FileSystemDirectoryHandle, FileSystemFileHandle, SerializedStorageFSA>;

export class StorageDirectoryFSA extends StorageDirectory<FileSystemDirectoryHandle, FileSystemFileHandle, SerializedStorageFSA> {

    protected storage: StorageFSA;
    private _entries?: StorageEntryFSA[];

    constructor(storage: StorageFSA, parent: StorageDirectoryFSA | null, handle: FileSystemDirectoryHandle) {
        super(storage, parent, handle);
    }

    getName() {
        return this.handle.name;
    }

    async getEntries(force?: boolean) {
        if (!force && this._entries) {
            return this._entries;
        }

        const entries: StorageEntryFSA[] = [];
        for await (const handle of this.handle.values()) {
            if (handle.kind === 'directory') {
                entries.push(new StorageDirectoryFSA(this.storage, this, handle));
            } else {
                entries.push(new StorageFileFSA(this.storage, this, handle));
            }
        }

        this._entries = entries;
        return entries;
    }

    async getEntry(name: string, force?: boolean) {
        const entries = await this.getEntries(force);
        return entries.find((entry) => entry.getName() === name);
    }

    async createDirectory(name: string) {
        const handle = await this.handle.getDirectoryHandle(name, {
            create: true
        });
        return new StorageDirectoryFSA(this.storage, this, handle);
    }

    async createFile(name: string) {
        const handle = await this.handle.getFileHandle(name, {
            create: true
        });
        return new StorageFileFSA(this.storage, this, handle);
    }

    async getSize() {
        return 4096;
    }

    async delete(recursive?: boolean) {
        if (!this.parent) {
            throw new StorageError('Can\'t delete root directory.');
        }
        await this.parent.getHandle().removeEntry(this.handle.name, {
            recursive
        });
    }
}

export class StorageFileFSA extends StorageFile<FileSystemDirectoryHandle, FileSystemFileHandle, SerializedStorageFSA> {

    protected storage: StorageFSA;

    constructor(storage: StorageFSA, parent: StorageDirectoryFSA, handle: FileSystemFileHandle) {
        super(storage, parent, handle);
    }

    getName() {
        return this.handle.name;
    }

    async getSize(): Promise<number> {
        const file = await this.handle.getFile();
        return file.size;
    }

    async read(start?: number, end?: number) {
        const file = await this.handle.getFile();
        return await file.slice(start, end).arrayBuffer();
    }

    async readText(start?: number, end?: number) {
        const file = await this.handle.getFile();
        return await file.slice(start, end).text();
    }

    async write(buffer: ArrayBuffer, start?: number, end?: number) {
        const writable = await this.handle.createWritable();

        if (start) {
            writable.seek(start);

            if (end) {
                buffer = buffer.slice(0, end - start);
            }
        }

        await writable.write(buffer);
        await writable.close();
    }

    async writeText(content: string, start?: number) {
        const writable = await this.handle.createWritable();

        if (start) {
            writable.seek(start);
        }

        await writable.write(content);
        await writable.close();
    }

    async delete() {
        await this.parent.getHandle().removeEntry(this.handle.name);
    }
}

interface SerializedStorageFSA extends SerializedStorage {
    handle: FileSystemDirectoryHandle;
}

const SERIAL_ID = 'StorageFSA';

@serializable(SERIAL_ID)
export class StorageFSA extends Storage<FileSystemDirectoryHandle, FileSystemFileHandle, SerializedStorageFSA> {

    private static PERMISSION_OPTIONS: FileSystemHandlePermissionDescriptor = {
        mode: 'readwrite'
    };

    private root: StorageDirectoryFSA;

    static getType() {
        return StorageType.FILE_SYSTEM_ACCESS;
    }

    static getName() {
        return 'File System Access';
    }

    static getAddText() {
        return 'Open local directory';
    }

    [getSerialId]() {
        return SERIAL_ID;
    }

    [serialize](): SerializedStorageFSA {
        return {
            ...super[serialize](),
            handle: this.root.getHandle()
        };
    }

    [deserialize](data: SerializedStorageFSA) {
        super[deserialize](data);
        this.root = new StorageDirectoryFSA(this, null, data.handle as FileSystemDirectoryHandle);
    }

    async getRoot(): Promise<StorageDirectoryFSA> {
        return this.root;
    }

    async hasPermission(): Promise<boolean> {
        return await this.root.getHandle().queryPermission(StorageFSA.PERMISSION_OPTIONS) === 'granted';
    }

    async requestPermission(): Promise<boolean> {
        return await this.root.getHandle().requestPermission(StorageFSA.PERMISSION_OPTIONS) === 'granted';
    }

    async add() {
        this.root = new StorageDirectoryFSA(this, null, await window.showDirectoryPicker());

        if (!await this.hasPermission()) {
            await this.requestPermission();
        }
    }
}
