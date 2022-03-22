import 'allotment/dist/style.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {Root} from './components/Root';
import {initialize} from './tools';

// Render application
ReactDOM.render(<Root />, document.getElementById('root'));

// Initialize tools in the background
initialize();
