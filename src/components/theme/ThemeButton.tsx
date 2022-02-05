import {Button, ButtonProps, StyledOcticon} from '@primer/react';
import {MoonIcon, SunIcon} from '@primer/octicons-react';
import React from 'react';

import {useAppDispatch, useAppSelector} from '../../store';
import {setSetting} from '../../store/settings';

export const ThemeButton: React.FC<ButtonProps> = (props) => {
    const theme = useAppSelector((state) => state.settings.theme);
    const dispatch = useAppDispatch();

    const handleClick = async () => {
        dispatch(setSetting({
            key: 'theme',
            value: theme == 'light' ? 'dark' : 'light'
        }));
    };

    return (
        <Button p={2} onClick={handleClick} {...props}>
            <StyledOcticon icon={theme === 'light' ? MoonIcon : SunIcon} />
        </Button>
    );
};
