import fs from 'fs';
import path from 'path';

import {Yosys} from 'yosys';

(async () => {
    const yosys = await Yosys.initialize({
        wasmBinary: fs.readFileSync(path.join(__dirname, '..', '..', 'node_modules', 'yosys', 'dist', 'yosys.wasm'))
    });
    console.log(yosys);
})();
