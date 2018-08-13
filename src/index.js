import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AppBar from './AppBar.js';

const rootElement = document.querySelector('#root');
ReactDOM.render(<App />, rootElement);
registerServiceWorker();
