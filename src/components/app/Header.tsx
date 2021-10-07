import {Header as PrimerHeader} from '@primer/components';
import React from 'react';

export const Header = () => {
    return (
        <header>
            <PrimerHeader style={{height: '3rem'}}>
                <PrimerHeader.Item>EDAcation</PrimerHeader.Item>
            </PrimerHeader>
        </header>
    );
};
