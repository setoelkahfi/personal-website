import React from 'react';
import { FormattedMessage } from 'react-intl';

const linkStyle = {
    display: 'inline-block',
    margin: 4,
    fontSize: '10pt',
    textDecoration: 'none',
    outline: 'none',
    color: '#fff',
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

const Cv = () => (
    <div>
        <h1>
            <FormattedMessage id="cv.title"
                       defaultMessage="CV"
                       description="CV page title"/>
        </h1>
        <p style={{lineHeight: "150%"}}><a style={linkStyle} href="https://docs.google.com/document/d/1O2NgIv8DIJIlH6H6Py71qQSi8T6Y9YNfa8TaTlUdywc/edit?usp=sharing" alt="Latest CV" target="_blank" rel="noopener noreferrer" >latest</a></p>
        <p style={{lineHeight: "150%"}}>or just visit my LinkedIn profile</p>
    </div>
);

export default Cv;
