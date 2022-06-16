import {serializeState} from '../serializable';
import {Storage} from '../storage';

const sharedBuffer = new SharedArrayBuffer(1024);

// @ts-expect-error: import.meta.url is not in the typing without ESM
const workerFs = new Worker(new URL('./fs.ts', import.meta.url), {type: 'module'});

workerFs.postMessage({
    type: 'init',
    sharedBuffer
});

// @ts-expect-error: import.meta.url is not in the typing without ESM
export const workerYosys = new Worker(new URL('./yosys.ts', import.meta.url), {type: 'module'});
// @ts-expect-error: import.meta.url is not in the typing without ESM
export const workerNextpnr = new Worker(new URL('./nextpnr.ts', import.meta.url), {type: 'module'});

const workers = [workerYosys, workerNextpnr];

for (const worker of workers) {
    const channel = new MessageChannel();

    worker.postMessage({
        type: 'init',
        sharedBuffer,
        portFs: channel.port1
    }, [channel.port1]);

    workerFs.postMessage({
        type: 'worker',
        port: channel.port2
    }, [channel.port2]);
}

export const updateWorkerStorage = async (storage: Storage<unknown, unknown>) => {
    if (!await storage.hasPermission()) {
        return;
    }

    workerFs.postMessage({
        type: 'storage',
        storage: serializeState(storage)
    });

    for (const worker of workers) {
        worker.postMessage({
            type: 'storage',
            storage: serializeState(storage)
        });
    }
};
