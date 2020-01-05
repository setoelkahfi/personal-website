import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';

type ContactProps = {
    firebase: Firebase | null
}

type ContactState = {
    content: string
}

class Contact extends Component<ContactProps, ContactState> {
    
    contactRef: app.database.Reference | undefined;

    constructor(props: ContactProps) {
        super(props);
        this.contactRef = this.props.firebase?.contactRef();
        this.state = {
          content: "Loading ..."
        }
    }
    componentWillMount() {
        this.contactRef?.on('value', (snapshot) => {
          let items = snapshot?.val();
          this.setState({
            content: items.content
          });
        });
    }
    
    componentWillUnmount() {
        this.contactRef?.off();
    }


    render() {
        return (
            <div>
                <h1>
                    <FormattedMessage id="contact.title"
                               defaultMessage="Contact"
                               description="Contact page title"/>
                </h1>
                <p style={{lineHeight: "150%"}}>{this.state.content}</p>
            </div>
        );
    }
}

export default Contact;
