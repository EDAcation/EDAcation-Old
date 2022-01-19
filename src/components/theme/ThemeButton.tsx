import {Button, ButtonProps, StyledOcticon} from '@primer/react';
import {MoonIcon, SunIcon} from '@primer/octicons-react';
import React, {useContext} from 'react';

import {StateContext} from '../state/StateContext';

export const ThemeButton: React.FC<ButtonProps> = (props) => {
    const [state, updateState] = useContext(StateContext);

    const handleClick = async () => {
        await updateState({
            theme: state.theme == 'light' ? 'dark' : 'light'
        });
    };

    return (
        <Button p={2} onClick={handleClick} {...props}>
            <StyledOcticon icon={state.theme === 'light' ? MoonIcon : SunIcon} />
        </Button>
    );
};
