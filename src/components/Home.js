import React, { Component } from 'react';
import ReactRotatingText from 'react-rotating-text';

const pStyle = {
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

function shuffle(array) {
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

var alterEgos = [
  'an Android developer',
  'an iOS developer',
  'a vlogger',
  'a guitarist',
  'a public speaker',
  'an LPDP awardee',
  'a Darwinian',
  'funny (sometimes)',
  'a language enthusiast',
  'a Javanese',
  'an Indonesian',
  'in love with you',
  'a bassist',
  'a man with vision',
  'a man with mission',
  'a gamelan player',
  'living in Stockholm'
];
alterEgos = shuffle(alterEgos);

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {pStyle: pStyle, wordStyle: wordStyle, alterEgos: alterEgos}
  }

  componentDidMount() {

  }

  componentWillMount() {
    
  }

  render() {
    return (
      <div>
        <h1>Hello, my name is Seto Elkahfi.</h1>
        <p style={this.state.pStyle}>I am <ReactRotatingText style={this.state.wordStyle} items={this.state.alterEgos}/></p>
      </div>
    );
  }
}

export default Home;
