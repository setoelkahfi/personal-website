import React from 'react';
import { FormattedMessage } from 'react-intl';

const About = () => (
    <div>
        <h1>
            <FormattedMessage id="about.title"
                      defaultMessage="About"
                      description="About page title"/>
        </h1>
        <p style={{lineHeight: "150%"}}>iOS developer with experience in AR, web development (PHP, Rails, JavaScript), and Android development.</p>
        <h2 style={{marginTop: 8}}>
            <FormattedMessage id="about.skills"
                       defaultMessage="Skills"
                       description="About page skills"/>
        </h2>
        <p style={{lineHeight: "150%"}}>Objective-C, Swift (iOS, Vapor), Ruby (Ruby on Rails), PHP (CodeIgniter), JavaScript (ReactJS, jQuery), Java (Android)</p>
        <p style={{lineHeight: "150%"}}>MacOS, Linux, Windows</p>
        <p style={{lineHeight: "150%"}}>iMovie, Adobe Premiere Pro, Adobe Photoshop, Adobe Audition</p>
    </div>
);

export default About;
