import {v4 as uuidv4} from 'uuid';

import {serializeState} from '../serializable';
import {EditorFileLoaded} from '../store/files';
import {workerNextpnr, workerYosys} from '../workers';
import {ToolResult} from '../workers/common/tool';

// TODO: implement job queue to reduce event listener re-adding

export const execute = async (worker: Worker, file: EditorFileLoaded) => new Promise<ToolResult[]>((resolve, reject) => {
    const id = uuidv4();

    const handleError: (event: ErrorEvent) => void = (event) => {
        reject(event.error);
    };

    const handleMessage: (event: MessageEvent<{id: string; result: ToolResult[]}>) => void = (event) => {
        if (event.data.id === id) {
            worker.removeEventListener('error', handleError);
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('messageerror', handleMessageError);

            resolve(event.data.result);
        }
    };

    const handleMessageError: (event: MessageEvent) => void = () => {
        reject(new Error('Worker message can\'t be deserialized.'));
    };

    worker.addEventListener('error', handleError);
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('messageerror', handleMessageError);

    worker.postMessage({
        type: 'call',
        id,
        storageId: file.file.getStorage().getID(),
        path: file.path
    });
});

export const executeYosys = (file: EditorFileLoaded) => execute(workerYosys, file);
export const executeNextpnr = (file: EditorFileLoaded) => execute(workerNextpnr, file);
