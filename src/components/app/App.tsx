import React from 'react';
import {Helmet} from 'react-helmet';

import {Header} from './Header';
import {Main} from './Main';
import {Footer} from './Footer';

export const App = () => {
    return (
        <>
            <Helmet titleTemplate="%s | EDAcation" defaultTitle="EDAcation" />

            <Header />
            <Main />
            <Footer />
        </>
    );
};
