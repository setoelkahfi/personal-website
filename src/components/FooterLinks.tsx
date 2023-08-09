import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const linkStyle = {
    display: 'inline-block',
    margin: 4,
    fontSize: '10pt',
    textDecoration: 'none',
    outline: 'none',
    color: '#ddd',
    background: '#222',
    borderTop: '1px solid #333',
    padding: '5px 8px',
    MozBorderRadius: '3px',
    WebkitBorderRadius: '3px',
    borderRadius: '3px',
    MozBoxShadow: '0px 1px 1px #000',
    WebkitBoxShadow: '0px 1px 1px #000',
    boxShadow: '0px 1px 1px #000'
};

const FooterLinks = () => (
    <footer className="text-muted py-5">
        <div className="container">
            <p className="float-end mb-1">
                <button style={linkStyle}>
                    <FormattedMessage id="footer.toTop"
                            defaultMessage="Back to top"
                            description="To top link" />
                </button>
            </p>
            <p className="mb-0">
                <Link to='/' style={linkStyle}>
                    <FormattedMessage id="header.home"
                        defaultMessage="Home"
                        description="Home link" />
                </Link>
                <Link to='/about' style={linkStyle}>
                    <FormattedMessage id="header.about"
                        defaultMessage="About"
                        description="About link" />
                </Link>
                <Link to='/cv' style={linkStyle}>
                    <FormattedMessage id="header.cv"
                        defaultMessage="CV"
                        description="CV link" />
                </Link>
                <Link to='/contact' style={linkStyle}>
                    <FormattedMessage id="header.contact"
                        defaultMessage="Contact"
                        description="Contact link" />
                </Link>
            </p>
        </div>
    </footer>
);

export default FooterLinks;