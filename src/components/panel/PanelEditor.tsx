import React from 'react';

import {Editor} from '../editor/Editor';
import {Tabs} from '../tabs/Tabs';

export const PanelEditor: React.FC = () => {
    return (
        <>
            <Tabs />
            <Editor />
        </>
    );
};
