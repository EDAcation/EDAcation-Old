import {Yosys} from 'yosys';

import {StorageFile} from '../storage';

import {ToolFSMapping, WorkerTool} from './common/tool';

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

    async execute(filePath: string, file: StorageFile<unknown, unknown>): Promise<ToolFSMapping[]> {
        this.tool.getFS().writeFile(`design.ys`, `
            design -reset;
            design -reset-vlog;
            read_verilog ${filePath};
            proc;
            opt;
            show;
            synth_ecp5 -json luts.json;
        `);

        // TODO: Yosys only accepts a script path and no flags
        // @ts-expect-error callMain does not exist on type
        this.tool.getModule().callMain(['design.ys']);

        const outputDirectory = file.getNameWithoutExtension();

        return [
            {
                path: outputDirectory,
                directory: true
            },
            {
                path: `${outputDirectory}/rtl.dot`,
                file: 'show.dot'
            },
            {
                path: `${outputDirectory}/luts.json`,
                file: 'luts.json'
            }
        ];
    }
}

new WorkerYosys(1);
