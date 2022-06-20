import {Yosys} from 'yosys';

import {StorageFile} from '../storage';

import {ToolResult, WorkerTool} from './common/tool';

export class WorkerYosys extends WorkerTool<Yosys> {

    async initialize() {
        // TODO: cache this using service worker or IndexedDB?
        const response = await fetch(`https://unpkg.com/yosys@${Yosys.getVersion()}/dist/yosys.wasm`);
        const wasmBinary = await response.arrayBuffer();

        const yosys = await Yosys.initialize({
            wasmBinary,
            print: (text) => console.log(text),
            printErr: (text) => console.log(text)
        });

        return yosys;
    }

    async execute(file: StorageFile<unknown, unknown>): Promise<ToolResult[]> {
        const path = `/storages/${file.getFullPath()}`;

        this.tool.getFS().writeFile(`design.ys`, `
            design -reset;
            design -reset-vlog;
            read_verilog ${path};
            proc;
            opt;
            show;
            synth_ice40 -json luts.json;
        `);

        // @ts-expect-error callMain does not exist on type
        this.tool.getModule().callMain(['-T', 'design.ys']);

        // TODO: consider writing back to FS here instead of in main thread

        return [{
            name: 'rtl.dot',
            content: this.tool.getFS().readFile('show.dot', {
                encoding: 'utf8'
            })
        }, {
            name: 'luts.json',
            content: this.tool.getFS().readFile('luts.json', {
                encoding: 'utf8'
            })
        }];
    }
}

new WorkerYosys(1);
