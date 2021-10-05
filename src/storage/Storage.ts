import {StorageType} from './StorageType';

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

// TODO: copy, move

export abstract class StorageDirectory<DirectoryHandle, FileHandle> extends StorageEntry<DirectoryHandle, FileHandle> {

    handle: DirectoryHandle;

    constructor(handle: DirectoryHandle) {
        super(handle, StorageEntryType.DIRECTORY);
    }

    abstract getEntries(recursive?: boolean, force?: boolean): Promise<StorageEntry<DirectoryHandle, FileHandle>[]>;

    abstract getEntry(name: string): Promise<StorageEntry<DirectoryHandle, FileHandle> | undefined>;

    abstract createDirectory(name: string): Promise<StorageDirectory<DirectoryHandle, FileHandle>>;

    abstract createFile(name: string): Promise<StorageFile<DirectoryHandle, FileHandle>>;

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
    parent: StorageDirectory<DirectoryHandle, FileHandle>;

    constructor(handle: FileHandle, parent: StorageDirectory<DirectoryHandle, FileHandle>) {
        super(handle, StorageEntryType.FILE);
        this.parent = parent;
    }

    abstract read(): Promise<string>;

    async readJSON() {
        return JSON.parse(await this.read());
    }

    abstract write(content: string): Promise<void>;

    async writeJSON(content: unknown) {
        await this.write(JSON.stringify(content));
    }

    abstract delete(): Promise<void>;
}

export abstract class Storage<DirectoryHandle, FileHandle> {

    static getType(): StorageType {
        throw new Error('Not implemented.');
    }

    static getName() {
        return this.name.replace('Storage', '');
    }

    static getAddText() {
        return `Add ${this.getName()} storage`;
    }

    getType() {
        return (this.constructor as typeof Storage).getType();
    }

    getName() {
        return (this.constructor as typeof Storage).getName();
    }

    abstract serialize(): Record<string, unknown>;

    abstract deserialize(data: Record<string, unknown>): void;

    abstract getRoot(): Promise<StorageDirectory<DirectoryHandle, FileHandle>>;

    abstract add(): Promise<void>;
}
