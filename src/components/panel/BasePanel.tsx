import {Panel} from '../../store/panels';

export interface BasePanelProps<PanelType extends Panel> {
    panel: PanelType;
}

export type BasePanel = React.FC<BasePanelProps<Panel>>;
