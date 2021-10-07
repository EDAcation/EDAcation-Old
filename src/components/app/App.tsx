import {useTheme} from '@primer/components';
import React, {useContext, useEffect} from 'react';
import {Helmet} from 'react-helmet';

import {StateContext} from '../state/StateContext';

import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';

export const App = () => {
    const [state] = useContext(StateContext);
    const {setColorMode} = useTheme();

    useEffect(() => {
        setColorMode(state.theme === 'light' ? 'day' : 'night');
    }, [state.theme]);

    return (
        <>
            <Helmet titleTemplate="%s | EDAcation" defaultTitle="EDAcation" />

            <Header />
            <Main />
            <Footer />
        </>
    );
};
