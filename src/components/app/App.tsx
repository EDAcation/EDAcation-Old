import {useTheme} from '@primer/react';
import React, {useEffect} from 'react';
import {Helmet} from 'react-helmet';

import {useAppSelector} from '../../store';

import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';

export const App = () => {
    const theme = useAppSelector((state) => state.settings.theme);
    const {setColorMode} = useTheme();

    useEffect(() => {
        setColorMode(theme === 'light' ? 'day' : 'night');
    }, [theme, setColorMode]);

    return (
        <>
            <Helmet titleTemplate="%s | EDAcation" defaultTitle="EDAcation" />

            <Header />
            <Main />
            <Footer />
        </>
    );
};
