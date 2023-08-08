import Home from '../components/Home';
import About from '../components/About';
import React from 'react';
import { getAbout, getHome, getContact } from './api';
import Contact from '../components/Contact';
import Cv from '../components/Cv';
import Firebase from '../components/Firebase';

export interface Route {
    path: Path;
    component: React.ComponentType<any>;
    exact?: boolean;
    fetchInitialData: (path: Path, firebase: Firebase) => Promise<InitialData>;
}

export type InitialData = {
    data: any;
    path: Path;
}

export enum Path {
    HOME = '/',
    ABOUT = '/about',
    CONTACT = '/contact',
    CV = '/cv'
}

// Desc: Routes for the application
const routes: Route[]  = [
    {
        path: Path.HOME,
        component: Home,
        exact: true,
        fetchInitialData: getHome
    },
    {
        path: Path.ABOUT,
        component: About,
        fetchInitialData: getAbout
    },
    {
        path: Path.CONTACT,
        component: Contact,
        fetchInitialData: getContact
    }
];

export default routes;