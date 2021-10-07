import {Storage, StorageDirectory, StorageEntry, StorageError, StorageFile} from './Storage';
import {StorageType} from './StorageType';

export type StorageEntryFSA = StorageEntry<FileSystemDirectoryHandle, FileSystemFileHandle>;

export class StorageDirectoryFSA extends StorageDirectory<FileSystemDirectoryHandle, FileSystemFileHandle> {

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

    async delete() {
        if (!this.parent) {
            throw new StorageError('Can\'t delete root directory.');
        }
        await this.parent.getHandle().removeEntry(this.handle.name);
    }
}

export class StorageFileFSA extends StorageFile<FileSystemDirectoryHandle, FileSystemFileHandle> {

    protected storage: StorageFSA;

    constructor(storage: StorageFSA, parent: StorageDirectoryFSA, handle: FileSystemFileHandle) {
        super(storage, parent, handle);
    }

    getName() {
        return this.handle.name;
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
        await this.parent.getHandle().removeEntry(this.handle.name);
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
            handle: this.root.getHandle()
        };
    }

    deserialize(data: Record<string, unknown>) {
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
