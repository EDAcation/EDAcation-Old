import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';
import {StorageFSA} from './storage/StorageFSA';

// Render application
ReactDOM.render(<Root />, document.getElementById('root'));

window.onload = (async () => {
    const storage = new StorageFSA();

    const directory = await storage.selectDirectory();
    await directory.print();
});
