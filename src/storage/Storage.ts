import {v4 as uuidv4} from 'uuid';

import {getSerialId, serialize, deserialize, Serializable} from '../serializable';

import {StorageType} from './StorageType';

export class StorageError extends Error {}

export enum StorageEntryType {
    DIRECTORY = 'DIRECTORY',
    FILE = 'FILE'
}

export abstract class StorageEntry<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage> {

    protected storage: Storage<DirectoryHandle, FileHandle, Serialized>;
    protected parent: StorageDirectory<DirectoryHandle, FileHandle, Serialized> | null;
    protected type: StorageEntryType;
    protected handle: DirectoryHandle | FileHandle;

    constructor(
        storage: Storage<DirectoryHandle, FileHandle, Serialized>,
        parent: StorageDirectory<DirectoryHandle, FileHandle, Serialized> | null,
        handle: DirectoryHandle | FileHandle,
        type: StorageEntryType
    ) {
        this.storage = storage;
        this.parent = parent;
        this.handle = handle;
        this.type = type;
    }

    getStorage() {
        return this.storage;
    }

    getParent() {
        return this.parent;
    }

    getHandle() {
        return this.handle;
    }

    getType() {
        return this.type;
    }

    abstract getName(): string;

    getNameWithoutExtension() {
        const name = this.getName();
        return name.includes('.') ? name.substring(0, name.indexOf('.')) : name;
    }

    getExtension() {
        const name = this.getName();
        return name.includes('.') ? name.substring(name.indexOf('.') + 1, name.length) : '';
    }

    getPath(): string[] {
        if (!this.parent) {
            return [];
        }
        return this.parent.getParent() ? [...this.parent.getPath(), this.getName()] : [this.getName()];
    }

    getFullPath(): string {
        return [this.getStorage().getID()].concat(this.getPath()).join('/');
    }

    abstract getSize(): Promise<number>;

    abstract delete(recursive?: boolean): Promise<void>;
}

// TODO: copy, move

export abstract class StorageDirectory<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage>
    extends StorageEntry<DirectoryHandle, FileHandle, Serialized> {

    protected handle: DirectoryHandle;

    constructor(
        storage: Storage<DirectoryHandle, FileHandle, Serialized>,
        parent: StorageDirectory<DirectoryHandle, FileHandle, Serialized> | null,
        handle: DirectoryHandle
    ) {
        super(storage, parent, handle, StorageEntryType.DIRECTORY);
    }

    getHandle() {
        return this.handle;
    }

    abstract getEntries(force?: boolean): Promise<StorageEntry<DirectoryHandle, FileHandle, Serialized>[]>;

    abstract getEntry(name: string, force?: boolean): Promise<StorageEntry<DirectoryHandle, FileHandle, Serialized> | undefined>;

    async getEntryByPath(path: string[], force?: boolean): Promise<StorageEntry<DirectoryHandle, FileHandle, Serialized> | undefined> {
        return Storage.getEntryByPath(this, path, force);
    }

    abstract createDirectory(name: string): Promise<StorageDirectory<DirectoryHandle, FileHandle, Serialized>>;

    abstract createFile(name: string): Promise<StorageFile<DirectoryHandle, FileHandle, Serialized>>;

    async print(indent = '') {
        console.log(`${indent}${this.getName()} (${this.getType().substring(0, 1)})`);
        indent += '|  ';

        for (const entry of await this.getEntries()) {
            if (entry instanceof StorageDirectory) {
                await entry.print(indent);
            } else {
                console.log(`${indent}${entry.getName()} (${entry.getType().substring(0, 1)})`);
            }
        }
    }
}

export abstract class StorageFile<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage>
    extends StorageEntry<DirectoryHandle, FileHandle, Serialized> {

    protected parent: StorageDirectory<DirectoryHandle, FileHandle, Serialized>;
    protected handle: FileHandle;

    constructor(
        storage: Storage<DirectoryHandle, FileHandle, Serialized>,
        parent: StorageDirectory<DirectoryHandle, FileHandle, Serialized>,
        handle: FileHandle
    ) {
        super(storage, parent, handle, StorageEntryType.FILE);
    }

    getParent() {
        return this.parent;
    }

    getHandle() {
        return this.handle;
    }

    abstract read(start?: number, end?: number): Promise<ArrayBuffer>;

    abstract readText(start?: number, end?: number): Promise<string>;

    async readJSON() {
        return JSON.parse(await this.readText());
    }

    abstract truncate(size: number): Promise<void>;

    abstract write(buffer: ArrayBuffer, start?: number, end?: number): Promise<void>;

    abstract writeText(content: string, start?: number): Promise<void>;

    async writeJSON(content: unknown) {
        await this.writeText(JSON.stringify(content));
    }
}

export interface StorageConstructor<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage> {
    new (id?: string): Storage<DirectoryHandle, FileHandle, Serialized>;

    getType(): StorageType;
    getName(): string;
    getAddText(): string;
}

export interface SerializedStorage {
    id: string;
}

export abstract class Storage<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage> implements Serializable<Serialized> {

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

    static async getEntryByPath<DirectoryHandle, FileHandle, Serialized extends SerializedStorage = SerializedStorage>(
        directory: StorageDirectory<DirectoryHandle, FileHandle, Serialized>,
        path: string[],
        force?: boolean
    ) {
        let current = directory;
        for (let i = 0; i < path.length; i++) {
            const entry = await current.getEntry(path[i], force);
            if (!entry) {
                return undefined;
            }
            if (i < path.length - 1) {
                if (!(entry instanceof StorageDirectory)) {
                    throw new StorageError(`Entry "${path[i]}" in path "${path.join('/')}" is not a directory.`);
                }
                current = entry;
                continue;
            }

            return entry;
        }
        return current;
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

    abstract [getSerialId](): string;

    [serialize](): Serialized {
        // @ts-expect-error: Technically a subclass could not override this method, which could cause type incompatibilities in the child,
        //                   but this should not happen in practice.
        return {
            id: this.getID()
        };
    }

    [deserialize](data: Serialized) {
        this.id = data.id;
    }

    abstract getRoot(): Promise<StorageDirectory<DirectoryHandle, FileHandle, Serialized>>;

    abstract hasPermission(): Promise<boolean>;

    abstract requestPermission(): Promise<boolean>;

    abstract add(): Promise<void>;

    async getEntry(path: string[], force?: boolean) {
        return await Storage.getEntryByPath(await this.getRoot(), path, force);
    }
}
