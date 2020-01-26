import React from 'react';
import Header from './Header';
import Main from './Main';
import FooterLinks from './FooterLinks';
import { CSSProperties } from 'react';

import { BrowserRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from './Firebase';
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

const mainStyle: CSSProperties = {
	position: 'absolute',
	top: 50,
	left: 50,
	background: 'rgba(0,0,0,0.65)',
	width: 300,
	textAlign: 'left',
	padding: 10
};

const App = () =>
	<IntlProvider locale={language} messages={messages[language]}>
		<BrowserRouter>
			<FirebaseContext.Provider value={new Firebase(language)}>
				<div style={mainStyle}>
					<Header />
					<Main />
					<FooterLinks />
				</div>
			</FirebaseContext.Provider>
		</BrowserRouter>
	</IntlProvider>;

export default App;
