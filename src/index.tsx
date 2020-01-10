import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './components/Firebase';
import { IntlProvider } from 'react-intl';
import { addLocaleData } from "react-intl";
import locale_en from 'react-intl/locale-data/en';
import locale_se from 'react-intl/locale-data/se';
import locale_id from 'react-intl/locale-data/id';
import messages_se from "./translations/se.json";
import messages_id from "./translations/id.json";
import messages_en from "./translations/en.json";

addLocaleData([...locale_en, ...locale_id, ...locale_se]);

const messages: {
    [key: string]: object,
   } = {
    "se": messages_se,
    "id": messages_id,
    "en": messages_en
};


var language = "en";
const tld = window.location.hostname.split('.').pop();

if (tld === "id") {
    language = "id";
} else if (tld === "se") {
    language = "se";
}

render((
    <IntlProvider locale={language} messages={messages[language]}>
        <BrowserRouter>
            <FirebaseContext.Provider value={new Firebase(language)}>
                <App />
            </FirebaseContext.Provider>
        </BrowserRouter>
    </IntlProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
