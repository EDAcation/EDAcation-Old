import {Yosys} from 'yosys';

import {deserializeState} from '../serializable';
import {SerializedStorage, Storage, StorageFile} from '../storage';

// NOTE: hack to ensure storage is imported as values and not just as types
console.log(Storage);

addEventListener('message', async (event: MessageEvent<{id: string; storage: SerializedStorage; path: string[]}>) => {
    console.log(event);

    const storage = deserializeState<Storage<unknown, unknown>>(event.data.storage);

    console.log(storage);

    const file = await storage.getEntry(event.data.path);

    const result = await synthesize(file);

    postMessage({
        id: event.data.id,
        result
    });
});

let yosys: Yosys | null = null;

export const initialize = async () => {
    // TODO: cache this using service worker or IndexedDB?
    const response = await fetch(`https://unpkg.com/yosys@${Yosys.getVersion()}/dist/yosys.wasm`);
    const wasmBinary = await response.arrayBuffer();

    yosys = await Yosys.initialize({
        wasmBinary,
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });

    console.log('Yosys is initialized.');

    return yosys;
};

export const synthesize = async (file: StorageFile<unknown, unknown>) => {
    if (!yosys) {
        yosys = await initialize();
    }

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
