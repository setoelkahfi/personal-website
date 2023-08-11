import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';
import { InitialData, Path } from '../shared/routes';

type ContactProps = {
    firebase?: Firebase
    initialData?: InitialData
}

type ContactState = {
    content: string
}

class Contact extends Component<ContactProps, ContactState> {
    
    contactRef: app.database.Reference | undefined;

    constructor(props: ContactProps) {
        super(props);
        this.contactRef = this.props.firebase?.contactRef();
        if (props.initialData?.path === Path.CONTACT) {
            this.state = {
                content: props.initialData?.data.content
            }
        } else {
            this.state = {
                content: "Loading ..."
            }
        }
    }
    
    componentDidMount() {
        if (this.props.initialData?.path === Path.CONTACT) {
            return;
        }

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
