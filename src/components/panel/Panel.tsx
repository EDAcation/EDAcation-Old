import React from 'react';

import {Panel as StorePanel, PanelType} from '../../store/panels';

import {BasePanel} from './BasePanel';
import {PanelEditor} from './PanelEditor';
import {PanelSplit} from './PanelSplit';

const panelComponents: {[t in PanelType]: BasePanel} = {
    [PanelType.SPLIT]: PanelSplit,
    [PanelType.EDITOR]: PanelEditor
};

export interface PanelProps {
    panel: StorePanel;
}

export const Panel: React.FC<PanelProps> = ({panel}) => {
    const PanelComponent = panelComponents[panel.type];

    if (!PanelComponent) {
        throw Error(`Unknown panel type "${panel.type}"`);
    }

    return (
        <>
            <PanelComponent panel={panel} />
        </>
    );
};
