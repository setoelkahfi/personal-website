import React from 'react';
import { hydrate } from 'react-dom';
import App from './components/App';
//import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Firebase from './components/Firebase';
import firebaseInstance from './components/Firebase/config';
import { InitialData } from './shared/routes';
import { determineUserLang } from './shared/i18n';

axios.defaults.baseURL = 'https://api.musik88.com/api/v1/';

declare global {
    interface Window { __DATA__?: InitialData; }
}

console.log('window.__DATA__', window.__DATA__);
const languages = navigator.languages || [];
console.log('CLIENT#languages', languages);
const language = determineUserLang([...languages]);
console.log('CLIENT#lang', language);

hydrate(
    <BrowserRouter>
        <App 
            firebase={new Firebase(language, firebaseInstance.database())} 
            initialData={window.__DATA__} 
        />
    </BrowserRouter>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();
