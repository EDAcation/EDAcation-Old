import {Storage, StorageDirectory, StorageEntry, StorageFile} from './Storage';
import {StorageType} from './StorageType';

export type StorageEntryFSA = StorageEntry<FileSystemDirectoryHandle, FileSystemFileHandle>;

export class StorageDirectoryFSA extends StorageDirectory<FileSystemDirectoryHandle, FileSystemFileHandle> {

    private _entries?: StorageEntryFSA[];

    constructor(handle: FileSystemDirectoryHandle) {
        super(handle);
        this.name = handle.name;
    }

    async getEntries(force?: boolean) {
        if (!force && this._entries) {
            return this._entries;
        }

        const entries: StorageEntryFSA[] = [];
        for await (const handle of this.handle.values()) {
            if (handle.kind === 'directory') {
                entries.push(new StorageDirectoryFSA(handle));
            } else {
                entries.push(new StorageFileFSA(handle, this));
            }
        }

        this._entries = entries;
        return entries;
    }

    async getEntry(name: string) {
        const entries = await this.getEntries();
        return entries.find((entry) => entry.name === name);
    }

    async createDirectory(name: string) {
        const handle = await this.handle.getDirectoryHandle(name, {
            create: true
        });
        return new StorageDirectoryFSA(handle);
    }

    async createFile(name: string) {
        const handle = await this.handle.getFileHandle(name, {
            create: true
        });
        return new StorageFileFSA(handle, this);
    }
}

export class StorageFileFSA extends StorageFile<FileSystemDirectoryHandle, FileSystemFileHandle> {

    constructor(handle: FileSystemFileHandle, parent: StorageDirectoryFSA) {
        super(handle, parent);
        this.name = handle.name;
    }

    async read() {
        const file = await this.handle.getFile();
        return await file.text();
    }

    async write(content: string) {
        const writable = await this.handle.createWritable();
        await writable.write(content);
        await writable.close();
    }

    async delete() {
        await this.parent.handle.removeEntry(this.handle.name);
    }
}

export class StorageFSA extends Storage<FileSystemDirectoryHandle, FileSystemFileHandle> {

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

    serialize() {
        return {
            handle: this.root.handle
        };
    }

    deserialize(data: Record<string, unknown>) {
        this.root = new StorageDirectoryFSA(data.handle as FileSystemDirectoryHandle);
    }

    async getRoot(): Promise<StorageDirectoryFSA> {
        return this.root;
    }

    async hasPermission(): Promise<boolean> {
        return await this.root.handle.queryPermission(StorageFSA.PERMISSION_OPTIONS) === 'granted';
    }

    async requestPermission(): Promise<boolean> {
        return await this.root.handle.requestPermission(StorageFSA.PERMISSION_OPTIONS) === 'granted';
    }

    async add() {
        this.root = new StorageDirectoryFSA(await window.showDirectoryPicker());

        if (!await this.hasPermission()) {
            await this.requestPermission();
        }
    }
}
