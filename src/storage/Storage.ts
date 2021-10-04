export enum StorageEntryType {
    DIRECTORY = 'DIRECTORY',
    FILE = 'FILE'
}

export abstract class StorageEntry<DirectoryHandle, FileHandle> {
    type: StorageEntryType;
    name: string;
    handle: DirectoryHandle | FileHandle;

    constructor(handle: DirectoryHandle | FileHandle, type: StorageEntryType) {
        this.handle = handle;
        this.type = type;
    }
}

export abstract class StorageDirectory<DirectoryHandle, FileHandle> extends StorageEntry<DirectoryHandle, FileHandle> {

    handle: DirectoryHandle;

    constructor(handle: DirectoryHandle) {
        super(handle, StorageEntryType.DIRECTORY);
    }

    abstract getEntries(recursive?: boolean, force?: boolean): Promise<StorageEntry<DirectoryHandle, FileHandle>[]>;

    async print(indent = '') {
        console.log(`${indent}${this.name} (${this.type.substring(0, 1)})`);
        indent += '|  ';

        for (const entry of await this.getEntries()) {
            if (entry instanceof StorageDirectory) {
                await entry.print(indent);
            } else {
                console.log(`${indent}${entry.name} (${entry.type.substring(0, 1)})`);
            }
        }
    }
}

export abstract class StorageFile<DirectoryHandle, FileHandle> extends StorageEntry<DirectoryHandle, FileHandle> {

    handle: FileHandle;

    constructor(handle: FileHandle) {
        super(handle, StorageEntryType.FILE);
    }
}

export abstract class Storage<DirectoryHandle, FileHandle> {

    abstract selectDirectory(): Promise<StorageDirectory<DirectoryHandle, FileHandle>>;
}
