import {Yosys} from 'yosys';

import {Storage, StorageFile} from '../storage';

import {createStorageFS} from './common/emscripten-fs';
import {ToolResult, WorkerTool} from './common/tool';

export class WorkerYosys extends WorkerTool<Yosys> {

    STORAGE_FS: ReturnType<typeof createStorageFS> | null = null;

    async initialize() {
        // TODO: cache this using service worker or IndexedDB?
        const response = await fetch(`https://unpkg.com/yosys@${Yosys.getVersion()}/dist/yosys.wasm`);
        const wasmBinary = await response.arrayBuffer();

        const yosys = await Yosys.initialize({
            wasmBinary,
            print: (text) => console.log(text),
            printErr: (text) => console.log(text)
        });

        // // Initialize file system
        this.STORAGE_FS = createStorageFS(yosys.getFS());
        // @ts-expect-error: FS.filesystems does not exist in typing
        yosys.getFS().filesystems.STORAGE_FS = this.STORAGE_FS;
        yosys.getFS().mkdir('/storages');
        // yosys.getFS().mount(this.STORAGE_FS, {}, '/storages');

        console.log('Yosys is initialized.');

        return yosys;
    }

    async execute(file: StorageFile<unknown, unknown>): Promise<ToolResult[]> {
        // NOTE: call test code
        try {
            await this.updateMount(file.getStorage());
        } catch (err) {
            console.error(err);
        }

        const extension = file.getExtension();
        const content = await file.read();

        // TODO: use actual file names (required for future multi file settings)

        this.tool.getFS().writeFile(`design.${extension}`, content);

        this.tool.getFS().writeFile(`design.ys`, `
            design -reset;
            design -reset-vlog;
            read_verilog design.${extension};
            proc;
            opt;
            show;
            synth_ice40 -json luts.json;
        `);

        // @ts-expect-error: ccall does not exist on type
        this.tool.getModule().ccall('run', '', ['string'], ['script design.ys']);

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

    async updateMount(storage: Storage<unknown, unknown>) {
        // NOTE: this entire method is test code

        if (!this.STORAGE_FS) {
            throw new Error('Storage file system does not exist.');
        }

        if (!await storage.hasPermission()) {
            console.warn('No permission');
            return;
        }

        const fs = this.tool.getFS();
        const path = `/storages/${storage.getID()}`;

        try {
            fs.lookupPath(path, {});
        } catch (err) {
            if (err instanceof Error && err.message === 'No such file or directory') {
                fs.mkdir(path);
                fs.mount(this.STORAGE_FS, {
                    storage
                }, path);
                console.log(fs.readdir(`${path}/`));
            } else {
                throw err;
            }
        }
    }
}

new WorkerYosys();
