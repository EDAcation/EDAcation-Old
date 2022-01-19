import {Header as PrimerHeader} from '@primer/react';
import React from 'react';

import {ThemeButton} from '../theme/ThemeButton';

export const Header = () => {
    return (
        <header>
            <PrimerHeader style={{height: '3rem'}}>
                <PrimerHeader.Item full>EDAcation</PrimerHeader.Item>

                <PrimerHeader.Item>
                    <ThemeButton />
                </PrimerHeader.Item>
            </PrimerHeader>
        </header>
    );
};
