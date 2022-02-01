import React from 'react';

import {BasePanel} from './BasePanel';
import {PanelEditor} from './PanelEditor';

export enum PanelType {
    EDITOR = 'EDITOR'
}

const panelComponents: {[t in PanelType]: BasePanel} = {
    [PanelType.EDITOR]: PanelEditor
};

export interface PanelProps {
    type: PanelType;
}

export const Panel: React.FC<PanelProps> = ({type}) => {
    const PanelComponent = panelComponents[type];

    if (!PanelComponent) {
        throw Error(`Unknown panel type "${type}"`);
    }

    return (
        <>
            <PanelComponent />
        </>
    );
};
