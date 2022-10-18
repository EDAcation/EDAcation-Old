import {Yosys} from 'yosys';

import {StorageDirectory, StorageFile} from '../storage';

import {WorkerTool} from './common/tool';

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

    async execute(
        filePath: string, file: StorageFile<unknown, unknown>, directoryPath: string, directory: StorageDirectory<unknown, unknown>
    ): Promise<string[]> {
        const outputDirectory = file.getNameWithoutExtension();
        const outputPath = `${directoryPath}/${outputDirectory}`;

        await directory.createDirectory(outputDirectory);

        this.tool.getFS().writeFile(`${outputPath}/test.json`, JSON.stringify({
            abc: 123
        }));

        this.tool.getFS().writeFile(`design.ys`, `
            design -reset;
            design -reset-vlog;
            read_verilog ${filePath};
            proc;
            opt;
            show;
            synth_ecp5 -json ${outputPath}/luts.json;
        `);
        // synth_ecp5 -json ${outputPath}/luts.json;

        // TODO: Yosys only accepts a script path and no flags
        // @ts-expect-error callMain does not exist on type
        this.tool.getModule().callMain(['design.ys']);

        // Changing the path for the "show" command does not work in WebAssembly, so copy the file instead
        this.tool.getFS().writeFile(`${outputPath}/rtl.dot`, this.tool.getFS().readFile('show.dot'));

        return [
            `${outputDirectory}/rtl.dot`,
            `${outputDirectory}/luts.json`
        ];
    }
}

new WorkerYosys(1);
