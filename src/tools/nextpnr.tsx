import fs from 'fs';
import path from 'path';

import {Nextpnr} from 'nextpnr';

import {EditorFileLoaded} from '../store/files';

let nextpnr: Nextpnr | null = null;

const WASM_URL = new URL('../../node_modules/nextpnr/dist/nextpnr-ice40.wasm', import.meta.url);

export const initialize = async () => {
    const response = await fetch(WASM_URL);
    const wasmBinary = await response.arrayBuffer();

    return await Nextpnr.initialize({
        wasmBinary,
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
};

export const placeAndRoute = async (file: EditorFileLoaded) => {
    if (!nextpnr) {
        nextpnr = await initialize();
    }

    // @ts-expect-error: callMain does not exist on type
    nextpnr.getModule().callMain(['nextpnr']);

    // TODO: write this function for nextpnr

    // const extension = file.file.getExtension();

    // nextpnr.getFS().writeFile(`design.${extension}`, file.content);

    // nextpnr.getFS().writeFile(`design.ys`, `
    //     design -reset;
    //     design -reset-vlog;
    //     read_verilog design.${extension};
    //     proc;
    //     opt;
    //     show;
    // `);

    // nextpnr.getModule().ccall('run', '', ['string'], ['script design.ys']);

    // return nextpnr.getFS().readFile('show.dot', {
    //     encoding: 'utf8'
    // });
};
