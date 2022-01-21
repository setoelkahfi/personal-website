import React, { Component, CSSProperties } from 'react';
import ReactRotatingText from 'react-rotating-text';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';
import axios from 'axios';

const pStyle: CSSProperties = {
  lineHeight: '32pt',
  marginTop: '10pt',
  fontSize: '20pt',
  textDecoration: 'none',
  outline: 'none',
};
const wordStyle = {
  color: '#FECD01',
  background: '#006BA8',
  padding: '5px 8px',
  MozBoxShadow: '0px 1px 1px #000',
  WebkitBoxShadow: '0px 1px 1px #000',
  boxShadow: '0px 1px 1px #000'
};

const initialValues: any = {
  "en": ["an Android developer", "an iOS developer"],
  "id": ["pengembang aplikasi Android", "pengembang aplikasi iOS"],
  "se": ["är Android-utvecklare", "är iOS-utvecklare"]
};


type HomeProps = {
  firebase: Firebase | null
}

type HomeState = {
  pStyle: any,
  wordStyle: any,
  alterEgos: any,
  files: any[]
}

class Home extends Component<HomeProps, HomeState> {

  whoAmIRef: app.database.Reference | undefined;

  constructor(props: HomeProps) {
    super(props);
    this.whoAmIRef = this.props.firebase?.whoAmIRef();
    this.state = {
      pStyle: pStyle,
      wordStyle: wordStyle,
      alterEgos: initialValues[this.props.firebase?.language ?? 'en'],
      files: []
    }
  }

  componentDidMount() {
    this.whoAmIRef?.on('value', (snapshot) => {
      let items = snapshot?.val();
      let whoAmI = [];
      for (let item in items) {
        whoAmI.push(items[item].content);
      }
      this.setState({
        alterEgos: this.shuffle(whoAmI)
      });
    });

    axios.get(`https://musik88.com/api/v1/splitfire`)
      .then(res => {
          const files = res.data.audio_files;
          this.setState({ files });
        })
  }

  componentWillUnmount() {
    this.whoAmIRef?.off();
  }

  shuffle(array: any[]) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  render() {
    const {files} = this.state;
    
    return (
      <div>
        <h1>
            <FormattedMessage id="home.title"
                      defaultMessage="Hello, my name is {name}"
                      description="Welcome message"
                      values={{ name: 'Seto Elkahfi' }}/>
        </h1>
        <p style={this.state.pStyle}>
                <FormattedMessage id="home.iam"
                      defaultMessage="I'm "
                      description="My self description"/>
            <ReactRotatingText style={this.state.wordStyle} items={this.state.alterEgos}/></p>
        <ul>
          {files.map(item => (
        <li key={item.id}>
          {item.created_at} {item.price}
        </li>
      ))}
        </ul>
    </div>
    );
  }
}

export default Home;
