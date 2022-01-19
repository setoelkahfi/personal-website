import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

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
                            <div className="col-sm-8 col-md-7 py-4">
                                <h4 className="text-white">
                                    <FormattedMessage id="about.title"
                                        defaultMessage="About"
                                        description="About page title" /></h4>
                                <p className="text-muted">We buy things we don't need, with money we don't have, to impress people we don't like.</p>
                            </div>
                            <div className="col-sm-4 offset-md-1 py-4">
                                <h4 className="text-white">Contact</h4>
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
                        <Link to='/' className="navbar-brand d-flex align-items-center">
                            <strong>@seto</strong>
                        </Link>
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
