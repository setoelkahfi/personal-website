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

class Home extends Component {

  constructor(props) {
    super(props);
    this.whoAmIRef = this.props.firebase.whoAmIRef();
    this.state = {
      pStyle: pStyle,
      wordStyle: wordStyle,
      alterEgos: ["an Android developer", "an iOS developer"]
    }
  }

  componentWillMount() {
    this.whoAmIRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let whoAmI = [];
      for (let item in items) {
        whoAmI.push(items[item].content);
      }
      this.setState({
        alterEgos: this.shuffle(whoAmI)
      });
    });
  }

  componentWillUnmount() {
    this.whoAmIRef.off();
  }

  shuffle(array) {
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
    return (
      <div>
        <h1>Hello, my name is Seto Elkahfi.</h1>
        <p style={this.state.pStyle}>I am <ReactRotatingText style={this.state.wordStyle} items={this.state.alterEgos}/></p>
      </div>
    );
  }
}

export default Home;
