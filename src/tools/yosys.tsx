import {Yosys} from 'yosys';

import {EditorFileLoaded} from '../store/files';

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
    return yosys;
};

export const synthesize = async (file: EditorFileLoaded) => {
    if (!yosys) {
        yosys = await initialize();
    }

    const extension = file.file.getExtension();

    yosys.getFS().writeFile(`design.${extension}`, file.content);

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
