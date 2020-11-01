import React, { Component, CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LanguageLinks from './LanguageLinks';

const styleHeader = {
    height: 50
}

const linkStyle = {
    color: '#fff',
    font: '11pt "Helvetica Neue", "Helvetica", Arial, sans-serif',
}

const listStyle = {
    display: 'inline',
    margin: 4
}

const listStyleLanguage: CSSProperties = {
    display: 'inline',
    margin: 4,
    float: 'right'
}

class Header extends Component {

    render() {
        return(
            <header style={styleHeader}>
                <nav>
                    <ul>
                        <li style={listStyle}><Link to='/' style={linkStyle}>
                                <FormattedMessage id="header.home"
                                    defaultMessage="Home"
                                    description="Home link"/>
                            </Link></li>
                        <li style={listStyle}><Link to='/about' style={linkStyle}>
                                <FormattedMessage id="header.about"
                                    defaultMessage="About"
                                    description="About link"/>
                            </Link></li>
                        <li style={listStyle}><Link to='/cv' style={linkStyle}>
                                <FormattedMessage id="header.cv"
                                    defaultMessage="CV"
                                    description="CV link"/>
                            </Link></li>
                        <li style={listStyle}><Link to='/contact' style={linkStyle}>
                                <FormattedMessage id="header.contact"
                                    defaultMessage="Contact"
                                    description="Contact link"/>
                            </Link></li>
                        <li style={listStyleLanguage}>
                            <LanguageLinks />
                        </li>
                    </ul>
                </nav>
            </header>
        )
    }
}

export default Header;
