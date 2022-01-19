import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import FooterLinks from './FooterLinks';
import { IntlProvider, addLocaleData } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import Firebase, { FirebaseContext } from '../components/Firebase';
import locale_en from 'react-intl/locale-data/en';
import locale_se from 'react-intl/locale-data/se';
import locale_id from 'react-intl/locale-data/id';
import messages_se from "../translations/se.json";
import messages_id from "../translations/id.json";
import messages_en from "../translations/en.json";

addLocaleData([...locale_en, ...locale_id, ...locale_se]);

let i18nConfig = {
	language: 'en',
	messages: messages_en
};

type AppProps = {}

type AppState = {
	language: string
}

class App extends Component<AppProps, AppState> {

	firebase: Firebase | null = null;

	onChangeLanguage(language: string) {
		switch (language) {
			case 'se': i18nConfig.messages = messages_se; break;
			case 'en': i18nConfig.messages = messages_en; break;
			case 'id': i18nConfig.messages = messages_id; break;
			default: i18nConfig.messages = messages_en; break;
		}
		i18nConfig.language = language;
		this.setState({ language: language })
	}

	createFirebaseContextIfNeeded(language: string): Firebase {
		if (this.firebase) {
			this.firebase.setLanguage(language);
		} else {
			this.firebase = new Firebase(language)
		}
		return this.firebase;
	}

	render() {
		return (
			<IntlProvider locale={i18nConfig.language} messages={i18nConfig.messages}>
				<BrowserRouter>
					<FirebaseContext.Provider value={this.createFirebaseContextIfNeeded(i18nConfig.language)}>
						<Header onChangeLanguage={this.onChangeLanguage.bind(this)} />
						<Main />
						<FooterLinks />
					</FirebaseContext.Provider>
				</BrowserRouter>
			</IntlProvider >
		);
	}
}

export default App;