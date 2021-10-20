import fs from 'fs';
import path from 'path';

import {Yosys} from 'yosys';

(async () => {
    const yosys = await Yosys.initialize({
        wasmBinary: fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm')),
        print: (text) => console.log(text),
        printErr: (text) => console.log(text)
    });
    // @ts-expect-error: FS does not exist in the typing
    const FS = yosys.getModule().FS;
    console.log(yosys.getModule(), FS);

    FS.writeFile('example.v', `
        module example(input clk, input rst, input inc, output reg [3:0] cnt);
            always @(posedge clk) begin
                if (rst)
                    cnt <= 0;
                else if (inc)
                    cnt <= cnt + 1;
            end
        endmodule
    `, {encoding: 'utf-8'});

    FS.writeFile('example.ys', `
        design -reset;
        read_verilog example.v;
        proc;
        opt;
        show;
    `, {encoding: 'utf-8'});

    // @ts-expect-error: run does not exist on window type
    const run = window.run = (command: str) => {
        // @ts-expect-error: ccall does not exist on type
        yosys.getModule().ccall('run', '', ['string'], [command]);
    };

    run('script example.ys');
})();
