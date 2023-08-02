import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import FooterLinks from './FooterLinks';
import { IntlProvider, addLocaleData } from 'react-intl';
import Firebase, { FirebaseContext } from '../components/Firebase';
import localeEn from 'react-intl/locale-data/en';
import localeSe from 'react-intl/locale-data/se';
import localeId from 'react-intl/locale-data/id';
import localeDe from 'react-intl/locale-data/de';
import localeFr from 'react-intl/locale-data/fr';
import localeZh from 'react-intl/locale-data/zh';
import localeEs from 'react-intl/locale-data/es';
import localeJa from 'react-intl/locale-data/ja';
import messages_sv from "../translations/sv.json";
import messages_id from "../translations/id.json";
import messages_en from "../translations/en.json";
import messagesDe from "../translations/de.json";
import messagesFr from "../translations/fr.json";
import messagesZh from "../translations/zh.json";
import messagesEs from "../translations/es.json";
import messagesJa from "../translations/ja.json";

addLocaleData([
	...localeEn,
	...localeId,
	...localeSe,
	...localeDe,
	...localeFr,
	...localeZh,
	...localeEs,
	...localeJa
]);

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
			case 'se': i18nConfig.messages = messages_sv; break;
			case 'en': i18nConfig.messages = messages_en; break;
			case 'id': i18nConfig.messages = messages_id; break;
			case 'de': i18nConfig.messages = messagesDe; break;
			case 'fr': i18nConfig.messages = messagesFr; break;
			case 'zh': i18nConfig.messages = messagesZh; break;
			case 'es': i18nConfig.messages = messagesEs; break;
			case 'ja': i18nConfig.messages = messagesJa; break;
			default: i18nConfig.messages = messages_en; break;
		}
		i18nConfig.language = language;
		this.setState({ language: language })
		if (this.firebase) {
			this.firebase.setLanguage(language)
		}
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
				<FirebaseContext.Provider value={this.createFirebaseContextIfNeeded(i18nConfig.language)}>
					<Header onChangeLanguage={this.onChangeLanguage.bind(this)} />
					<Main />
					<FooterLinks />
				</FirebaseContext.Provider>
			</IntlProvider >
		);
	}
}

export default App;