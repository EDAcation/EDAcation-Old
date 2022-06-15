import {v4 as uuidv4} from 'uuid';

import {serializeState} from '../serializable';
import {EditorFileLoaded} from '../store/files';
import {workerNextpnr} from '../workers';

interface ToolResult {
    name: string;
    content: string;
}

// TODO: implement job queue to reduce event listener re-adding

export const placeAndRoute = async (file: EditorFileLoaded) => new Promise<ToolResult[]>((resolve, reject) => {
    const id = uuidv4();

    const handleError: (event: ErrorEvent) => void = (event) => {
        reject(event.error);
    };

    const handleMessage: (event: MessageEvent<{id: string; result: ToolResult[]}>) => void = (event) => {
        if (event.data.id === id) {
            workerNextpnr.removeEventListener('error', handleError);
            workerNextpnr.removeEventListener('message', handleMessage);
            workerNextpnr.removeEventListener('messageerror', handleMessageError);

            resolve(event.data.result);
        }
    };

    const handleMessageError: (event: MessageEvent) => void = () => {
        reject(new Error('Worker message can\'t be deserialized.'));
    };

    workerNextpnr.addEventListener('error', handleError);
    workerNextpnr.addEventListener('message', handleMessage);
    workerNextpnr.addEventListener('messageerror', handleMessageError);

    workerNextpnr.postMessage({
        type: 'nextpnr',
        id,
        storage: serializeState(file.file.getStorage()),
        path: file.path
    });
});
