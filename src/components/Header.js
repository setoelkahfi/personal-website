import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const linkStyle = {
    color: '#fff',
    font: '11pt "Helvetica Neue", "Helvetica", Arial, sans-serif',
}

const listStyle = {
    display: 'inline',
    margin: 4
}

const Header = () => (
    <header>
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
            </ul>
        </nav>
    </header>
);

export default Header;
