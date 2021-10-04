import React from 'react';

import {EditorMonaco} from '../editor/EditorMonoca';
import {FileBrowser} from '../file-browser/FileBrowser';

export const Main = () => {
    return (
        <main style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <div style={{display: 'flex', alignItems: 'center', padding: '0.5rem', backgroundColor: '#111', color: '#fff'}}>
                EDAcation
            </div>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{width: '30vw', backgroundColor: '#111'}}>
                    <FileBrowser />
                </div>
                <div style={{width: '70vw'}}>
                    <EditorMonaco />
                </div>
            </div>
        </main>
    );
};
