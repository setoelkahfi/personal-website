import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Cv from './Cv';
import Contact from './Contact';
import { FirebaseContext } from './Firebase';

const mainStyle = {
    minHeight: 500,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    color: '#fff',
    font: '11pt "Helvetica Neue", "Helvetica", Arial, sans-serif',
};

const Main = () => (
    <main style={mainStyle}>
        <Switch>
            <Route exact path='/'>
                <FirebaseContext.Consumer>
                    {firebase => <Home firebase={firebase} />}
                </FirebaseContext.Consumer>
            </Route>
            <Route path='/about'>
                <FirebaseContext.Consumer>
                    {firebase => <About firebase={firebase} />}
                </FirebaseContext.Consumer>
            </Route>
            <Route path='/cv'>
                <FirebaseContext.Consumer>
                    {firebase => <Cv firebase={firebase} />}
                </FirebaseContext.Consumer>
            </Route>

            <Route path='/contact'>
                <FirebaseContext.Consumer>
                    {firebase => <Contact firebase={firebase} />}
                </FirebaseContext.Consumer>
            </Route>
        </Switch>
    </main>
);

export default Main;