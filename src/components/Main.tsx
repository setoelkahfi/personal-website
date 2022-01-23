import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Cv from './Cv';
import Contact from './Contact';
import { FirebaseContext } from './Firebase';
import AudioPlayer from './AudioPlayer';

const mainStyle = {
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 5,
    marginRight: 5,
    color: '#fff',
    font: '11pt "Helvetica Neue", "Helvetica", Arial, sans-serif',
};

const contentStyle = {
    borderRadius: '100px!important',
    backgroundColor: 'rgba(52, 52, 52, 0.5)'
}

const Main = () => (
    <main style={mainStyle}>
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto" style={contentStyle}>
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
                        <Route exact path='/splitfire/:audio_id' render={(props) => <AudioPlayer audioFileId={props.match.params.audio_id} /> }/>
                    </Switch>
                </div>
            </div>
        </section>
    </main>
);

export default Main;