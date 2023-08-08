import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';
import { InitialData, Path } from '../shared/routes';

type CvProps = {
    firebase?: Firebase
    initialData?: InitialData
}

type CvState = {
    content: string
}

class Cv extends Component<CvProps, CvState> {
    
    cvRef: app.database.Reference | undefined;
    
    constructor(props: CvProps) {
        super(props);
        this.cvRef = this.props.firebase?.cvRef();
        if (props.initialData?.path === Path.CV) {
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
        if (this.props.initialData?.path === Path.CV) {
            return;
        }

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
