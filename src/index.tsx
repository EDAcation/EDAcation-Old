import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';
// import {StorageFile} from './storage/Storage';
// import {StorageFSA} from './storage/StorageFSA';

// Render application
ReactDOM.render(<Root />, document.getElementById('root'));

// window.onload = (async () => {
//     const storage = new StorageFSA();

//     const directory = await storage.selectDirectory();
//     await directory.print();

//     const entries = await directory.getEntries();
//     console.log(await (entries.find((entry) => entry instanceof StorageFile) as StorageFile<unknown, unknown>).read());

//     const dir = await directory.createDirectory('test3');
//     const file = await dir.createFile(`test${new Date().getMilliseconds()}.txt`);
//     await file.write(`It is currently ${new Date().toISOString()}`);
//     console.log(file);
// });
