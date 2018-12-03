import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'

const rootElement = document.querySelector('#root');
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, rootElement);
registerServiceWorker();
