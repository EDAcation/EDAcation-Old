import {Box} from '@primer/react';
import React from 'react';

export const PanelButtons: React.FC = ({children}) => {
    return (
        <Box sx={{position: 'absolute', width: '100%', bottom: '0px', p: '2'}}>
            {children}
        </Box>
    );
};
