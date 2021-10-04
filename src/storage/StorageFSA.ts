import {Storage, StorageDirectory, StorageEntry, StorageFile} from './Storage';

export type StorageEntryFSA = StorageEntry<FileSystemDirectoryHandle, FileSystemFileHandle>;

export class StorageDirectoryFSA extends StorageDirectory<FileSystemDirectoryHandle, FileSystemFileHandle> {

    _entries?: StorageEntryFSA[];

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
}

export class StorageFileFSA extends StorageFile<FileSystemDirectoryHandle, FileSystemFileHandle> {

    constructor(handle: FileSystemFileHandle) {
        super(handle);
        this.name = handle.name;
    }
}

export class StorageFSA extends Storage<FileSystemDirectoryHandle, FileSystemFileHandle> {

    async selectDirectory(): Promise<StorageDirectoryFSA> {
        return new StorageDirectoryFSA(await window.showDirectoryPicker());
    }
}
