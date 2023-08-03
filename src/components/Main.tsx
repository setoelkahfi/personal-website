import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { FirebaseContext } from './Firebase';
import routes from '../shared/routes';

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
    backgroundColor: 'rgba(52, 52, 52, 0.6)'
}

const Main = () => (
    <main style={mainStyle}>
        <section className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-lg-6 col-md-8 mx-auto" style={contentStyle}>
                    <Switch>
                        {
                            routes.map((route, index) => (
                                <Route key={index} path={route.path}>
                                    <route.component />
                                </Route>
                            ))
                        }
                    </Switch>
                </div>
            </div>
        </section>
    </main>
);

export default Main;