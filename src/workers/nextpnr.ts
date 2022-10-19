import {Nextpnr} from 'nextpnr';

import {ToolFSMapping, WorkerTool} from './common/tool';

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

    async execute(filePath: string): Promise<ToolFSMapping[]> {
        // @ts-expect-error: callMain does not exist on type
        this.tool.getModule().callMain([
            '--lp384',
            '--json', filePath,
            '--package', 'qn32',
            '--write', 'routed.json',
            '--placed-svg', 'placed.svg',
            '--routed-svg', 'routed.svg'
        ]);

        return [
            {
                path: 'routed.json',
                file: 'routed.json'
            },
            {
                path: 'placed.svg',
                file: 'placed.svg'
            },
            {
                path: 'routed.svg',
                file: 'routed.svg'
            }
        ];
    }
}

new WorkerNextpnr(2);
