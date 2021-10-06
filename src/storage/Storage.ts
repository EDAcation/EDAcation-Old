import {v4 as uuidv4} from 'uuid';

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

    private id: string;

    static getType(): StorageType {
        throw new Error('Not implemented.');
    }

    static getName() {
        return this.name.replace('Storage', '');
    }

    static getAddText() {
        return `Add ${this.getName()} storage`;
    }

    constructor(id?: string) {
        this.id = id || uuidv4();
    }

    getID() {
        return this.id;
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

    abstract hasPermission(): Promise<boolean>;

    abstract requestPermission(): Promise<boolean>;

    abstract add(): Promise<void>;

    async getEntry(path: string[]) {
        let current = await this.getRoot();
        for (let i = 0; i < path.length; i++) {
            const entry = await current.getEntry(path[i]);
            if (!entry) {
                throw new Error(`Entry "${path[i]}" in path "${path.join('/')}" does not exist.`);
            }
            if (i < path.length - 1) {
                if (!(entry instanceof StorageDirectory)) {
                    throw new Error(`Entry "${path[i]}" in path "${path.join('/')}" is not a directory.`);
                }
                current = entry;
            }

            return entry as StorageFile<unknown, unknown>;
        }
        throw new Error('Unreachable code.');
    }
}
