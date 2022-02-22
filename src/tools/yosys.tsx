import fs from 'fs';
import path from 'path';

import {Yosys} from 'yosys';

import {EditorFile} from '../state';

// (async () => {
//     const yosys = await Yosys.initialize({
//         wasmBinary: fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm')),
//         print: (text) => console.log(text),
//         printErr: (text) => console.log(text)
//     });
//     const FS = yosys.getFS();
//     console.log(yosys.getModule(), FS);

//     yosys.getFS().writeFile('example.v', `
//         module example(input clk, input rst, input inc, output reg [3:0] cnt);
//             always @(posedge clk) begin
//                 if (rst)
//                     cnt <= 0;
//                 else if (inc)
//                     cnt <= cnt + 1;
//             end
//         endmodule
//     `);

//     yosys.getFS().writeFile('example.ys', `
//         design -reset;
//         read_verilog example.v;
//         proc;
//         opt;
//         show;
//     `);

//     // @ts-expect-error: run does not exist on window type
//     const run = window.run = (command: str) => {
//         // @ts-expect-error: ccall does not exist on type
//         yosys.getModule().ccall('run', '', ['string'], [command]);
//         console.log(yosys.getFS().readFile('show.dot', {
//             encoding: 'utf8'
//         }));
//     };

//     run('script example.ys');
// })();

let yosys: Yosys | null = null;

export const initialize = async () => {
    return await Yosys.initialize({
        wasmBinary: fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm')),
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
};

export const synthesize = async (file: EditorFile) => {
    if (!yosys) {
        yosys = await initialize();
    }

    yosys.getFS().writeFile(`design${file.getExtension()}`, file.getContent());

    yosys.getFS().writeFile(`design.ys`, `
        design -reset;
        read_verilog design${file.getExtension()};
        proc;
        opt;
        show -nobg -format svg;
    `);

    // @ts-expect-error: ccall does not exist on type
    yosys.getModule().ccall('run', '', ['string'], ['script design.ys']);

    console.log('test');

    let content: string;

    try {
        // @ts-ignore: options
        console.log(yosys.getFS().readdir('.', {}));
        content = yosys.getFS().readFile('show.dot', {
            encoding: 'utf8'
        });
        console.log(content);

        return content;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
