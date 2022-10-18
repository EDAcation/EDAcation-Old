import {Nextpnr} from 'nextpnr';

import {StorageDirectory, StorageFile} from '../storage';

import {WorkerTool} from './common/tool';

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

    async execute(
        filePath: string, file: StorageFile<unknown, unknown>, directoryPath: string, directory: StorageDirectory<unknown, unknown>
    ): Promise<string[]> {
        const outputDirectory = file.getNameWithoutExtension();
        const outputPath = `${directoryPath}/${outputDirectory}`;

        await directory.createDirectory(outputDirectory);

        // @ts-expect-error: callMain does not exist on type
        this.tool.getModule().callMain([
            '--lp384',
            '--json', filePath,
            '--package', 'qn32',
            '--write', `${outputPath}/routed.json`,
            '--placed-svg', `${outputPath}/placed.svg`,
            '--routed-svg', `${outputPath}/routed.svg`
        ]);

        return [
            `${outputDirectory}/routed.json`,
            `${outputDirectory}/placed.svg`,
            `${outputDirectory}/routed.svg`
        ];
    }
}

new WorkerNextpnr(2);
