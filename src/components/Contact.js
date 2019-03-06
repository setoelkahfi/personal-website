import React from 'react';
import { FormattedMessage } from 'react-intl';

const Contact = () => (
    <div>
        <h1>
            <FormattedMessage id="contact.title"
                       defaultMessage="Contact"
                       description="Contact page title"/>
        </h1>
        <p style={{lineHeight: "150%"}}>Contact me via email: setoelkahfi[at]gmail[dot]com.</p>
        <p style={{lineHeight: "150%"}}>or reach me directly via my social channel.</p>
    </div>
);

export default Contact;
