import React, { Component, CSSProperties } from 'react';
import ReactRotatingText from 'react-rotating-text';
import { FormattedMessage } from 'react-intl';
import Firebase from './Firebase';
import app from 'firebase/app';
import axios from 'axios';
import { Button, Carousel, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
  "sv": ["är Android-utvecklare", "är iOS-utvecklare"],
  "es": ["an Android developer", "an iOS developer"],
  "de": ["an Android developer", "an iOS developer"],
  "fr": ["an Android developer", "an iOS developer"],
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

  whoAmIRef: app.database.Reference | undefined

  onLanguageChangedCallback = () => {
    console.log("onLanguageChangedCallback")
  }

  constructor(props: HomeProps) {
    super(props);
    this.whoAmIRef = this.props.firebase?.whoAmIRef();
    this.state = {
      pStyle: pStyle,
      wordStyle: wordStyle,
      alterEgos: initialValues[this.props.firebase?.language ?? 'en'],
      files: []
    }
    if (this.props.firebase)
      this.props.firebase.onLanguageChangedCallback = this.onLanguageChangedCallback.bind(this)
  }

  componentDidMount() {
    this._updateTranslationIfNeeded()
    axios.get(`/splitfire`)
      .then(res => {
        const files = res.data.audio_files;
        this.setState({ files });
      })
  }

  componentWillUnmount() {
    this.whoAmIRef?.off();
    if (this.props.firebase)
      this.props.firebase.onLanguageChangedCallback = null
  }

  _updateTranslationIfNeeded() {
    this.whoAmIRef?.on('value', (snapshot) => {
      let items = snapshot?.val();
      let whoAmI = [];
      for (let item in items) {
        whoAmI.push(items[item].content);
      }
      this.setState({
        alterEgos: this.shuffle(whoAmI)
      });
    })
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
    const { files } = this.state

    let caraoselContent: any = <div>
      <p>
        <FormattedMessage id="home.loading"
                    defaultMessage="Loading SplitFire AI..."
                    description="Loading message"/>
      </p>
      <Spinner animation='grow' variant="danger"></Spinner>
    </div>

    if (files.length > 0) {
      caraoselContent = <div>
        <h2>SplitFire AI</h2>
        <p>
            <FormattedMessage id="splitfire.whatIs"
                                defaultMessage="I'm an artificial intelligence software that can split your favorite music to its separate components."
                                description="Explanation message"/>
        </p>
        <Carousel>
        {files.slice(0, 5).map(item => (
          <Carousel.Item key={item.id} style={{ padding: '20px' }}>
            <img
              className="d-block w-100"
              src={`https://img.youtube.com/vi/${item.youtube_video_id}/hqdefault.jpg`}
              alt="First slide"
            />
            <Carousel.Caption>
              <Link to={{ pathname: `/splitfire/${item.id}` }}>
                <Button variant="dark">{item.filename}</Button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        </Carousel>
      </div>
    }

    return (
      <div>
        <h1>
          <FormattedMessage id="home.title"
            defaultMessage="Hello, my name is {name}"
            description="Welcome message"
            values={{ name: 'Seto Elkahfi' }} />
        </h1>
        <p style={this.state.pStyle}>
          <FormattedMessage id="home.iam"
            defaultMessage="I'm "
            description="My self description" />
          <ReactRotatingText style={this.state.wordStyle} items={this.state.alterEgos} /></p>
        {caraoselContent}
      </div>
    );
  }
}

export default Home;
