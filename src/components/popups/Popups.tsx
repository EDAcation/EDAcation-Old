import React from 'react';

import {useAppSelector} from '../../store';

import {Popup} from './Popup';

export const Popups = () => {
    const popup = useAppSelector((state) => state.popups.length > 0 ? state.popups[0] : null);

    return (
        <>
            {popup && <Popup popup={popup} />}
        </>
    );
};
