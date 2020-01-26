import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';

type CvProps = {
    firebase: Firebase | null
}

type CvState = {
    content: string
}

class Cv extends Component<CvProps, CvState> {
    
    cvRef: app.database.Reference | undefined;
    
    constructor(props: CvProps) {
        super(props);
        this.cvRef = this.props.firebase?.cvRef();
        this.state = {
          content: "Loading ..."
        }
    }
    UNSAFE_componentWillMount() {
        this.cvRef?.on('value', (snapshot) => {
          let items = snapshot?.val();
          this.setState({
            content: items.content
          });
        });
    }
    
    componentWillUnmount() {
        this.cvRef?.off();
    }

    render() {
        return (
            <div>
                <h1>
                    <FormattedMessage id="cv.title"
                            defaultMessage="CV"
                            description="CV page title"/>
                </h1>
                <p style={{lineHeight: "150%"}}>{this.state.content}</p>
            </div>
            );
    }
}

export default Cv;
