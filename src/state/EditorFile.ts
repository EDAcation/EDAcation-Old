import {v4 as uuidv4} from 'uuid';

import {Storage, StorageFile} from '../storage';
import {getSerialId, serialize, deserialize, Serializable, serializable} from '../serializable';

interface SerializedEditorFile {
    id: string;
    storageId: string;
    path: string[];
}

const SERIAL_ID = 'EditorFile';

@serializable(SERIAL_ID)
export class EditorFile implements Serializable<SerializedEditorFile> {

    private id: string;
    private storageId: string;
    private storage: Storage<unknown, unknown>;
    private path: string[];
    private file?: StorageFile<unknown, unknown>;
    private originalContent?: string;
    private content?: string;
    private saved: boolean;

    constructor(file?: StorageFile<unknown, unknown>) {
        this.id = uuidv4();
        this.saved = true;

        if (file) {
            this.file = file;
            this.storage = file.getStorage();
            this.storageId = this.storage.getID();
            this.path = this.file.getPath();
        }
    }

    getID() {
        return this.id;
    }

    getStorage() {
        return this.storage;
    }

    getName() {
        return this.path[this.path.length - 1];
    }

    getPath() {
        return this.path;
    }

    getFullPath() {
        return [this.storage.getID()].concat(this.path).join('/');
    }

    isAvailable() {
        return !!this.file;
    }

    isAccessible() {
        return this.storage.hasPermission();
    }

    isLoaded() {
        return this.isAvailable() && !!this.originalContent;
    }

    isSaved() {
        return this.saved;
    }

    getOriginalContent() {
        if (!this.isLoaded()) {
            throw new Error('Editor file is not loaded.');
        }
        return this.originalContent as string;
    }

    getContent() {
        if (!this.isLoaded()) {
            throw new Error('Editor file is not loaded.');
        }
        return this.content as string;
    }

    async access() {
        if (!await this.storage.hasPermission()) {
            return false;
        }

        this.file = await this.storage.getEntry(this.path);
        return true;
    }

    async load() {
        console.log(this);
        if (!this.isAvailable()) {
            throw new Error('Editor file is not available.');
        } else if (this.isLoaded()) {
            throw new Error('Editor file is already loaded.');
        }

        this.originalContent = await this.file?.read();
        this.content = this.originalContent;
    }

    async save(force?: boolean) {
        if (!this.isLoaded()) {
            throw new Error('Editor file is not loaded.');
        } else if (!this.content) {
            throw new Error('Edtitor file has no content.');
        }

        const currentContent = await this.file?.read();
        if (!force && currentContent !== this.originalContent) {
            throw new Error('Editor file has been changed on storage.');
        }

        await this.file?.write(this.content);

        this.saved = true;
        this.originalContent = this.content;
    }

    change(content: string) {
        this.content = content;
        this.saved = this.content === this.originalContent;
    }

    [getSerialId]() {
        return SERIAL_ID;
    }

    [serialize](): SerializedEditorFile {
        return {
            id: this.id,
            storageId: this.storageId,
            path: this.path
        };
    }

    [deserialize](data: SerializedEditorFile, partialState: Record<string, unknown>) {
        this.id = data.id;
        this.storageId = data.storageId;
        this.path = data.path;

        const storage = (partialState.storages as Storage<unknown, unknown>[]).find((storage) => storage.getID() === data.storageId);
        if (!storage) {
            throw new Error(`Unknown storage ID "${data.storageId}".`);
        }
        this.storage = storage;
    }
}
