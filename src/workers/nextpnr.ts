import {Nextpnr} from 'nextpnr';

import {StorageFile} from '../storage';

import {ToolResult, WorkerTool} from './common/tool';

class WorkerNextpnr extends WorkerTool<Nextpnr> {

    async initialize() {
        // TODO: cache this using service worker or IndexedDB?
        const response = await fetch(`https://unpkg.com/nextpnr@${Nextpnr.getVersion()}/dist/nextpnr-ice40.wasm`);
        const wasmBinary = await response.arrayBuffer();

        const nextpnr = await Nextpnr.initialize({
            wasmBinary,
            print: (text) => console.log(text),
            printErr: (text) => console.log(text)
        });

        return nextpnr;
    }

    async execute(file: StorageFile<unknown, unknown>): Promise<ToolResult[]> {
        const content = await file.readText();
        this.tool.getFS().writeFile('luts.json', content);

        // @ts-expect-error: callMain does not exist on type
        this.tool.getModule().callMain([
            '--lp384',
            '--json', 'luts.json',
            '--package', 'qn32',
            '--write', 'routed.json',
            '--placed-svg', 'placed.svg',
            '--routed-svg', 'routed.svg'
        ]);

        return [{
            name: 'routed.json',
            content: this.tool.getFS().readFile('routed.json', {
                encoding: 'utf8'
            })
        }, {
            name: 'placed.svg',
            content: this.tool.getFS().readFile('placed.svg', {
                encoding: 'utf8'
            })
        }, {
            name: 'routed.svg',
            content: this.tool.getFS().readFile('routed.svg', {
                encoding: 'utf8'
            })
        }];
    }
}

new WorkerNextpnr(2);
