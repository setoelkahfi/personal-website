import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

class About extends Component {
    
    constructor(props) {
        super(props);
        this.aboutRef = this.props.firebase.aboutRef();
        this.state = {
          contentMain: "Loading ...",
          contentSkills: "Loading ...",
          updatedAt: "Loading ..."
        }
    }
    componentWillMount() {
        this.aboutRef.on('value', (snapshot) => {
          let items = snapshot.val();
          this.setState({
            contentMain: items.contentMain,
            contentSkills: items.contentSkills,
            updatedAt: items.updatedAt
          });
        });
    }
    
    componentWillUnmount() {
        this.aboutRef.off();
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
