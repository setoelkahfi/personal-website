import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import LanguageDropdown from './LanguageDropdown';

type HeaderProps = {
    onChangeLanguage: (language: string) => void
}

type HeaderState = {
    expand: boolean
}

class Header extends Component<HeaderProps, HeaderState> {

    constructor(props: HeaderProps | Readonly<HeaderProps>) {
        super(props);
        this.state = { expand: false };
    }

    toggleExpand() {
        this.setState({ expand: !this.state.expand })
    }

    render() {
        return (
            <header>
                <div className={`collapse bg-dark ${this.state.expand ? 'show' : ''}`} id="navbarHeader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6 col-md-6 py-4">
                                <h4 className="text-white">
                                    <FormattedMessage id="about.title"
                                        defaultMessage="About"
                                        description="About page title" /></h4>
                                <p className="text-muted">We buy things we don't need, with money we don't have, to impress people we don't like.</p>
                                <p className="text-muted">Get your first <a href="https://www.americanexpress.se/bjudin/setoE9El2?CPID=999999550" target="_blank">American Express card</a>.</p>
                                <p className="text-muted">Get your proper vm, <a href="https://hetzner.cloud/?ref=WwAE3O6U53DF">Kamerad</a>.</p>
                            </div>
                            <div className="col-sm-2 offset-md-1 py-4">
                                <h4 className="text-white">
                                    <FormattedMessage id="header.fun"
                                        defaultMessage="Fun projects"
                                        description="Fun projects title"/></h4>
                                <ul className="list-unstyled">
                                    <li><a className="text-white" href="https://musik88.com/" title="Musik88" target="_blank" rel="noopener noreferrer">Musik88</a></li>
                                    <li><a className="text-white" href="https://splitfire.ai/" title="SplitFire AI" target="_blank" rel="noopener noreferrer">SplitFire AI</a></li>
                                    <li><a className="text-white" href="https://smbpndk.com/" title="SumbuPendek" target="_blank" rel="noopener noreferrer">SumbuPendek</a></li>
                                    <li><a className="text-white" href="https://scandinasia.eu/" title="SumbuPendek" target="_blank" rel="noopener noreferrer">United States of Scandinasia</a></li>
                                </ul>
                            </div>
                            <div className="col-sm-2 py-4">
                                <h4 className="text-white">
                                    <FormattedMessage id="contact.title"
                                        defaultMessage="Contact"
                                        description="Contact page title"/></h4>
                                <ul className="list-unstyled">
                                    <li><a className="text-white" href="https://stackoverflow.com/users/1137814/seto" title="StackOverflow" target="_blank" rel="noopener noreferrer">StackOverflow</a></li>
                                    <li><a className="text-white" href="https://github.com/setoelkahfi" title="GitHub" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                    <li><a className="text-white" href="https://medium.com/@setoelkahfi" title="Medium" target="_blank" rel="noopener noreferrer">Medium</a></li>
                                    <li><a className="text-white" href="https://id.linkedin.com/in/setoelkahfi" title="LinkedIn" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="navbar navbar-dark bg-dark shadow-sm">
                    <div className="container">
                        <a href={`https://musik88.com/@seto`} target={`__blank`} className="navbar-brand d-flex align-items-center">
                            <strong>@seto</strong>
                        </a>
                        <LanguageDropdown onChangeLanguage={this.props.onChangeLanguage} />
                        <button className="navbar-toggler" onClick={this.toggleExpand.bind(this)} type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded={this.state.expand} aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;
