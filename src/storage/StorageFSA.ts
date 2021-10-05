import {Storage, StorageDirectory, StorageEntry, StorageFile} from './Storage';

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
                entries.push(new StorageFileFSA(handle));
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
        return new StorageFileFSA(handle);
    }
}

export class StorageFileFSA extends StorageFile<FileSystemDirectoryHandle, FileSystemFileHandle> {

    constructor(handle: FileSystemFileHandle) {
        super(handle);
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
}

export class StorageFSA extends Storage<FileSystemDirectoryHandle, FileSystemFileHandle> {

    static getName() {
        return 'File System Access';
    }

    static getAddText() {
        return 'Open local directory';
    }

    async selectDirectory(): Promise<StorageDirectoryFSA> {
        return new StorageDirectoryFSA(await window.showDirectoryPicker());
    }
}
