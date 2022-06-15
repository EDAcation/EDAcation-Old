import {deserializeState} from '../../serializable';
import {SerializedStorage, Storage, StorageFile} from '../../storage';

import {Data} from './data';

export interface ToolMessageInit {
    type: 'init';
    sharedBuffer: SharedArrayBuffer;
    portFs: MessagePort;
}

export interface ToolMessageCall {
    type: 'call';
    id: string;
    storage: SerializedStorage;
    path: string[];
}

export type ToolMessage = ToolMessageInit | ToolMessageCall;

// TODO: consider if this is needed
export interface ToolResult {
    name: string;
    content: string;
}

export abstract class WorkerTool<Tool> {

    private sharedBuffer: SharedArrayBuffer;
    private arrayInt32: Int32Array;
    private portFs: MessagePort;

    private toolPromise: Promise<void>;
    protected tool: Tool;

    constructor() {
        this.toolPromise = (async () => {
            this.tool = await this.initialize();
        })();

        addEventListener('message', this.handleMessage.bind(this));
        addEventListener('messageerror', this.handleMessageError.bind(this));
    }

    handleMessage(event: MessageEvent<ToolMessage>) {
        switch (event.data.type) {
            case 'init': {
                this.init(event.data);
                break;
            }
            case 'call': {
                this.call(event.data);
                break;
            }
        }
    }

    handleMessageError(event: MessageEvent) {
        console.error('Failed to deserialize worker message.', event);
    }

    async init(message: ToolMessageInit) {
        this.sharedBuffer = message.sharedBuffer;
        this.arrayInt32 = new Int32Array(this.sharedBuffer);
        this.portFs = message.portFs;
    }

    async call(message: ToolMessageCall) {
        // Deserialize storage
        // TODO: reduce the amount of times storage is passed between workers
        const storage = deserializeState<Storage<unknown, unknown>>(message.storage);
        console.log(storage);

        // Find the file in storage
        const file = await storage.getEntry(message.path);
        if (!(file instanceof StorageFile)) {
            throw new Error('Storage entry is not a file.');
        }

        // NOTE: start test code
        this.portFs.postMessage({
            type: 'storage',
            storage: message.storage
        });

        console.log('start of test');

        const jobId = Atomics.add(this.arrayInt32, 0, 1);

        console.log('sending message to fs', jobId);

        this.portFs.postMessage({
            type: 'call',
            jobId,
            storageId: storage.getID(),
            path: file.getParent().getPath()
        });

        console.log('waiting...');

        Atomics.wait(this.arrayInt32, 1, jobId);

        console.log('done waiting');

        const data = new Data(this.sharedBuffer, 8);
        const array = data.readStringArray();

        console.log('received', array);

        console.log('end of test');

        // NOTE: end test code

        // Ensure the tool is initialized
        if (!this.tool) {
            await this.toolPromise;
        }

        // Execute the tool
        const result = await this.execute(file);

        postMessage({
            id: message.id,
            result
        });
    }

    abstract initialize(): Promise<Tool>;

    abstract execute(file: StorageFile<unknown, unknown>): Promise<ToolResult[]>;
}
