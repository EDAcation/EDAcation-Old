import {Panel} from '../../store/panels';

export interface BasePanelProps {
    panel: Panel;
}

export type BasePanel = React.FC<BasePanelProps>;
