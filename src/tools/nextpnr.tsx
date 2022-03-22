import {Nextpnr} from 'nextpnr';

import {EditorFileLoaded} from '../store/files';

// @ts-expect-error: Parcel's import object only exists when TypeScript modules are
const WASM_URL = new URL('../../node_modules/nextpnr/dist/nextpnr-ice40.wasm', import.meta.url);

let nextpnr: Nextpnr | null = null;

export const initialize = async () => {
    const response = await fetch(WASM_URL.toString());
    const wasmBinary = await response.arrayBuffer();

    nextpnr = await Nextpnr.initialize({
        wasmBinary,
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
    return nextpnr;
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
