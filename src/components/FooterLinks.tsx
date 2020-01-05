import React from 'react';

const footerStyle = {
    padding: '0 30 30 30',
    color: '#fff',
    font: '11pt "Helvetica Neue", "Helvetica", Arial, sans-serif',
    textShadow: '#000 0px 1px 0px',
    lineHeight: '200%'
};

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
    <footer style={footerStyle}>
        <a style={linkStyle} href="https://stackoverflow.com/users/1137814/seto" title="StackOverflow" target="_blank" rel="noopener noreferrer">stackoverflow</a>
		<a style={linkStyle} href="https://github.com/setoelkahfi" title="GitHub" target="_blank" rel="noopener noreferrer">github</a>
		<a style={linkStyle} href="https://medium.com/@setoelkahfi" title="Medium" target="_blank" rel="noopener noreferrer">medium</a>
		<a style={linkStyle} href="https://id.linkedin.com/in/setoelkahfi" title="LinkedIn" target="_blank" rel="noopener noreferrer">linkedin</a>
    </footer>
);

export default FooterLinks;