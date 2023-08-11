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
import messages_sv from "../shared/translations/sv.json";
import messages_id from "../shared/translations/id.json";
import messages_en from "../shared/translations/en.json";
import messagesDe from "../shared/translations/de.json";
import messagesFr from "../shared/translations/fr.json";
import messagesZh from "../shared/translations/zh.json";
import messagesEs from "../shared/translations/es.json";
import messagesJa from "../shared/translations/ja.json";
import { InitialData } from '../shared/routes';

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

export type AppProps = {
	firebase?: Firebase
	initialData?: InitialData
}

type AppState = {
	language: string
}

class App extends Component<AppProps, AppState> {

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
		if (this.props.firebase) {
			this.props.firebase.setLanguage(language)
		}
	}

	render() {
		return (
			<IntlProvider locale={i18nConfig.language} messages={i18nConfig.messages}>
				<FirebaseContext.Provider value={this.props.firebase}>
					<Header onChangeLanguage={this.onChangeLanguage.bind(this)} />
					<Main 
						firebase={this.props.firebase} 
						initialData={this.props.initialData} 
					/>
					<FooterLinks />
				</FirebaseContext.Provider>
			</IntlProvider >
		);
	}
}

export default App;