import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class Contact extends Component {

    constructor(props) {
        super(props);
        this.contactRef = this.props.firebase.contactRef();
        this.state = {
          content: "Loading ..."
        }
    }
    componentWillMount() {
        this.contactRef.on('value', (snapshot) => {
          let items = snapshot.val();
          this.setState({
            content: items.content
          });
        });
    }
    
    componentWillUnmount() {
        this.contactRef.off();
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
