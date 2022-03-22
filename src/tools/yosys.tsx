import fs from 'fs';
import path from 'path';

import {Yosys} from 'yosys';

import {EditorFileLoaded} from '../store/files';

let yosys: Yosys | null = null;

export const initialize = async () => {
    return await Yosys.initialize({
        wasmBinary: fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm')),
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
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
    `);

    // @ts-expect-error: ccall does not exist on type
    yosys.getModule().ccall('run', '', ['string'], ['script design.ys']);

    return yosys.getFS().readFile('show.dot', {
        encoding: 'utf8'
    });
};
