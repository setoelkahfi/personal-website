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
		<a style={linkStyle} href="https://github.com/setoelkahfi" alt="GitHub" target="_blank" rel="noopener noreferrer">github</a>
		<a style={linkStyle} href="https://id.linkedin.com/in/setoelkahfi" alt="LinkedIn" target="_blank" rel="noopener noreferrer">linkedin</a>
		<a style={linkStyle} href="https://stackoverflow.com/users/1137814/seto" alt="StackOverflow" target="_blank" rel="noopener noreferrer">stackoverflow</a>
		<a style={linkStyle} href="https://www.quora.com/profile/Seto-Elkahfi" alt="Quora" target="_blank" rel="noopener noreferrer">quora</a>
		<a style={linkStyle} href="http://blog.setoelkahfi.web.id" alt="Blog" target="_blank" rel="noopener noreferrer">blog</a>
		<a style={linkStyle} href="https://www.youtube.com/user/setoelkahfi?sub_confirmation=1" alt="YouTube" target="_blank" rel="noopener noreferrer">youtube</a>
		<a style={linkStyle} href="https://fb.com/setoelkahfi" alt="Facebook" target="_blank" rel="noopener noreferrer">facebook</a>
		<a style={linkStyle} href="https://www.instagram.com/setoelkahfi/" alt="Instagram" target="_blank" rel="noopener noreferrer">instagram</a>
		<a style={linkStyle} href="https://twitter.com/setoelkahfi" alt="Twitter" target="_blank" rel="noopener noreferrer">twitter</a>
    </footer>
);

export default FooterLinks;