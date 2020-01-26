import React, { Component } from 'react';
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

type AppProps = {
    firebase: Firebase | null
}

type AppState = {
    contentMain: string,
    contentSkills: string,
    updatedAt: string
}

class App extends Component {

	messages: {
		[key: string]: object,
	} = {
		"se": messages_se,
		"id": messages_id,
		"en": messages_en
	};
	
	language = "en";
	
	mainStyle: CSSProperties = {
		position: 'absolute',
		top: 50,
		left: 50,
		background: 'rgba(0,0,0,0.65)',
		width: 300,
		textAlign: 'left',
		padding: 10
	};

	constructor(props: AppProps) {
		super(props)

		const tld = window.location.hostname.split('.').pop();
	
		if (tld === "id") {
			this.language = "id";
		} else if (tld === "se") {
			this.language = "se";
		}
	}

	render() {
		return (
			<IntlProvider locale={this.language} messages={this.messages[this.language]}>
				<BrowserRouter>
					<FirebaseContext.Provider value={new Firebase(this.language)}>
						<div style={this.mainStyle}>
							<Header />
							<Main />
							<FooterLinks />
						</div>
					</FirebaseContext.Provider>
				</BrowserRouter>
			</IntlProvider>
		)
	}
}

export default App;
