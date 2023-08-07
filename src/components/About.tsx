import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';
import { InitialData } from '../shared/routes';

type AboutProps = {
    firebase: Firebase | null
    initialData?: InitialData
}

type AboutState = {
    contentMain: string,
    contentSkills: string,
    updatedAt: string
}

class About extends Component<AboutProps, AboutState> {

    aboutRef: app.database.Reference | undefined;
    
    constructor(props: AboutProps) {
        super(props);
        this.aboutRef = this.props.firebase?.aboutRef();
        if (this.props.initialData) {
            console.log(this.props.initialData);
            this.state = {
              contentMain: this.props.initialData['data']['contentMain'],
              contentSkills: this.props.initialData['data']['contentSkills'],
              updatedAt: this.props.initialData['data']['updatedAt']
            }
        } else {
            this.state = {
            contentMain: "Loading ...",
            contentSkills: "Loading ...",
            updatedAt: "Loading ..."
            }
        }
    }

    componentDidMount() {
        if (this.props.initialData) 
            return;

        this.aboutRef?.on('value', (snapshot) => {
          let items = snapshot?.val();
          this.setState({
            contentMain: items.contentMain,
            contentSkills: items.contentSkills,
            updatedAt: items.updatedAt
          });
        });
    }
    
    componentWillUnmount() {
        this.aboutRef?.off();
    }

    render() {
        return (
            <div>
                <h1>
                    <FormattedMessage id="about.title"
                            defaultMessage="About"
                            description="About page title"/>
                </h1>
                <p style={{lineHeight: "150%"}}>{this.state.contentMain}</p>
                <h2 style={{marginTop: 8}}>
                    <FormattedMessage id="about.skills"
                            defaultMessage="Skills"
                            description="About page skills"/>
                </h2>
                <p style={{lineHeight: "150%"}}>{this.state.contentSkills}</p>
            </div>
        );
    }
}

export default About;
