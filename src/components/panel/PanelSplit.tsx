import React from 'react';
/* eslint-disable-next-line */
import {Allotment} from 'allotment';

import {PanelSplit as PanelSplitType} from '../../store/panels';

import {BasePanelProps} from './BasePanel';
import {Panel} from './Panel';

export const PanelSplit: React.FC<BasePanelProps<PanelSplitType>> = ({panel}) => {
    return (
        <Allotment minSize={100} vertical={panel.direction === 'vertical'}>
            {panel.children.map((child) => (
                <Allotment.Pane>
                    <Panel key={child.id} panel={child} />
                </Allotment.Pane>
            ))}
        </Allotment>
    );
};
