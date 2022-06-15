import {Yosys} from 'yosys';

import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageFile} from '../storage';
import {createStorageFS} from '../tools/fs';

import {Data} from './common/data';

// NOTE: hack to ensure storage is imported as values and not just as types
console.log(Storage);

interface MessageInit {
    type: 'init';
    sharedBuffer: SharedArrayBuffer;
    portFs: MessagePort;
}

interface MessageSynthesize {
    type: 'synthesize';
    id: string;
    storage: SerializedStorage;
    path: string[];
}

type Message = MessageInit | MessageSynthesize;

interface State {
    sharedBuffer: SharedArrayBuffer;
    arrayUint8: Uint8Array;
    arrayInt32: Int32Array;
    portFs: MessagePort;
}

let state: State;

addEventListener('message', async (event: MessageEvent<Message>) => {
    console.log(event);

    switch (event.data.type) {
        case 'init': {
            const {sharedBuffer, portFs} = event.data;

            state = {
                sharedBuffer,
                arrayUint8: new Uint8Array(sharedBuffer),
                arrayInt32: new Int32Array(sharedBuffer),
                portFs
            };

            break;
        }
        case 'synthesize': {
            // TODO: reduce the amount of times storage is passed between workers
            const storage = deserializeState<Storage<unknown, unknown>>(event.data.storage);

            console.log(storage);

            const file = await storage.getEntry(event.data.path);
            if (!(file instanceof StorageFile)) {
                throw new Error('Storage entry is not a file.');
            }

            state.portFs.postMessage({
                type: 'storage',
                storage: event.data.storage
            });

            console.log('start of test');

            const jobId = Atomics.add(state.arrayInt32, 0, 1);

            console.log('sending message to fs', jobId);

            state.portFs.postMessage({
                type: 'call',
                jobId,
                storageId: storage.getID(),
                path: file.getParent().getPath()
            });

            console.log('waiting...');

            Atomics.wait(state.arrayInt32, 1, jobId);

            console.log('done waiting');

            const data = new Data(state.sharedBuffer, 8);
            const array = data.readStringArray();

            console.log('received', array);

            console.log('end of test');

            const result = await synthesize(file);

            postMessage({
                id: event.data.id,
                result
            });

            break;
        }
    }
});

let yosys: Yosys | null = null;
let STORAGE_FS: ReturnType<typeof createStorageFS> | null = null;

export const initialize = async () => {
    // TODO: cache this using service worker or IndexedDB?
    const response = await fetch(`https://unpkg.com/yosys@${Yosys.getVersion()}/dist/yosys.wasm`);
    const wasmBinary = await response.arrayBuffer();

    yosys = await Yosys.initialize({
        wasmBinary,
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });

    // // Initialize file system
    STORAGE_FS = createStorageFS(yosys.getFS());
    // @ts-expect-error: FS.filesystems does not exist in typing
    yosys.getFS().filesystems.STORAGE_FS = STORAGE_FS;
    yosys.getFS().mkdir('/storages');
    // yosys.getFS().mount(STORAGE_FS, {}, '/storages');

    console.log('Yosys is initialized.');

    return yosys;
};

export const updateMount = async (storage: Storage<unknown, unknown>) => {
    if (!yosys) {
        yosys = await initialize();
    }

    if (!STORAGE_FS) {
        throw new Error('Storage file system does not exist.');
    }

    if (!await storage.hasPermission()) {
        console.warn('No permission');
        return;
    }

    const path = `/storages/${storage.getID()}`;

    try {
        yosys.getFS().lookupPath(path, {});
    } catch (err) {
        if (err instanceof Error && err.message === 'No such file or directory') {
            yosys.getFS().mkdir(path);
            yosys.getFS().mount(STORAGE_FS, {
                storage
            }, path);
            console.log(yosys.getFS().readdir(`${path}/`));
        } else {
            throw err;
        }
    }
};

export const synthesize = async (file: StorageFile<unknown, unknown>) => {
    if (!yosys) {
        yosys = await initialize();
    }

    await updateMount(file.getStorage());

    const extension = file.getExtension();
    const content = await file.read();

    // TODO: use actual file names (required for future multi file settings)

    yosys.getFS().writeFile(`design.${extension}`, content);

    yosys.getFS().writeFile(`design.ys`, `
        design -reset;
        design -reset-vlog;
        read_verilog design.${extension};
        proc;
        opt;
        show;
        synth_ice40 -json luts.json;
    `);

    // @ts-expect-error: ccall does not exist on type
    yosys.getModule().ccall('run', '', ['string'], ['script design.ys']);

    // TODO: consider writing back to FS here instead of in main thread

    return [{
        name: 'rtl.dot',
        content: yosys.getFS().readFile('show.dot', {
            encoding: 'utf8'
        })
    }, {
        name: 'luts.json',
        content: yosys.getFS().readFile('luts.json', {
            encoding: 'utf8'
        })
    }];
};

initialize();
