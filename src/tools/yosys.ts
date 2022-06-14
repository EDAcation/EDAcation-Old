import {v4 as uuidv4} from 'uuid';
// import {Yosys} from 'yosys';

import {serializeState} from '../serializable';
import {EditorFileLoaded} from '../store/files';

// let yosys: Yosys | null = null;

// @ts-expect-error: import.meta.url is not in the typing without ESM
const worker = new Worker(new URL('./worker.ts', import.meta.url), {type: 'module'});

// export const initialize = async () => {
//     // TODO: cache this using service worker or IndexedDB?
//     const response = await fetch(`https://unpkg.com/yosys@${Yosys.getVersion()}/dist/yosys.wasm`);
//     const wasmBinary = await response.arrayBuffer();

//     yosys = await Yosys.initialize({
//         wasmBinary,
//         print: (text) => console.log(text),
//         printErr: (text) => console.log(text)
//     });
//     return yosys;
// };

interface ToolResult {
    name: string;
    content: string;
}

// TODO: implement job queue to reduce event listener re-adding

export const synthesize = async (file: EditorFileLoaded) => new Promise<ToolResult[]>((resolve, reject) => {
    const id = uuidv4();

    const handleError: (event: ErrorEvent) => void = (event) => {
        reject(event.error);
    };

    const handleMessage: (event: MessageEvent<{id: string; result: ToolResult[]}>) => void = (event) => {
        if (event.data.id === id) {
            worker.removeEventListener('error', handleError);
            worker.removeEventListener('message', handleMessage);
            worker.removeEventListener('messageerror', handleMessageError);

            resolve(event.data.result);
        }
    };

    const handleMessageError: (event: MessageEvent) => void = () => {
        reject(new Error('Worker message can\'t be deserialized.'));
    };

    worker.addEventListener('error', handleError);
    worker.addEventListener('message', handleMessage);
    worker.addEventListener('messageerror', handleMessageError);

    worker.postMessage({
        id,
        storage: serializeState(file.file.getStorage()),
        path: file.path
    });
});

// export const synthesize = async (file: EditorFileLoaded) => {
//     if (!yosys) {
//         yosys = await initialize();
//     }

//     const extension = file.file.getExtension();

//     yosys.getFS().writeFile(`design.${extension}`, file.content);

//     yosys.getFS().writeFile(`design.ys`, `
//         design -reset;
//         design -reset-vlog;
//         read_verilog design.${extension};
//         proc;
//         opt;
//         show;
//         synth_ice40 -json luts.json;
//     `);

//     // @ts-expect-error: ccall does not exist on type
//     yosys.getModule().ccall('run', '', ['string'], ['script design.ys']);

//     return [{
//         name: 'rtl.dot',
//         content: yosys.getFS().readFile('show.dot', {
//             encoding: 'utf8'
//         })
//     }, {
//         name: 'luts.json',
//         content: yosys.getFS().readFile('luts.json', {
//             encoding: 'utf8'
//         })
//     }];
// };
