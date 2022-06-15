import {Nextpnr} from 'nextpnr';

import {StorageFile} from '../storage';

// TODO: copy more code from Yosys worker

let nextpnr: Nextpnr | null = null;

export const initialize = async () => {
    // TODO: cache this using service worker or IndexedDB?
    const response = await fetch(`https://unpkg.com/nextpnr@${Nextpnr.getVersion()}/dist/nextpnr-ice40.wasm`);
    const wasmBinary = await response.arrayBuffer();

    nextpnr = await Nextpnr.initialize({
        wasmBinary,
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
    return nextpnr;
};

export const placeAndRoute = async (file: StorageFile<unknown, unknown>) => {
    if (!nextpnr) {
        nextpnr = await initialize();
    }

    const content = await file.read();
    nextpnr.getFS().writeFile('luts.json', content);

    // @ts-expect-error: callMain does not exist on type
    nextpnr.getModule().callMain([
        '--lp384',
        '--json', 'luts.json',
        '--package', 'qn32',
        '--write', 'routed.json',
        '--placed-svg', 'placed.svg',
        '--routed-svg', 'routed.svg'
    ]);

    return [{
        name: 'routed.json',
        content: nextpnr.getFS().readFile('routed.json', {
            encoding: 'utf8'
        })
    }, {
        name: 'placed.svg',
        content: nextpnr.getFS().readFile('placed.svg', {
            encoding: 'utf8'
        })
    }, {
        name: 'routed.svg',
        content: nextpnr.getFS().readFile('routed.svg', {
            encoding: 'utf8'
        })
    }];
};

initialize();
