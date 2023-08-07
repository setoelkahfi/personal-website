import Home from '../components/Home';
import About from '../components/About';
import React from 'react';
import { getAbout, getCaraousel, getContact } from './api';
import Contact from '../components/Contact';
import Cv from '../components/Cv';
import Firebase from '../components/Firebase';

export interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
    fetchInitialData: (path: string, firebase: Firebase) => Promise<InitialData>;
}

export type InitialData = {
    data: any;
    path: string;
}

// Desc: Routes for the application
const routes: Route[]  = [
    {
        path: '/',
        component: Home,
        exact: true,
        fetchInitialData: (path, firebase) => getCaraousel()
    },
    {
        path: '/about',
        component: About,
        fetchInitialData: getAbout
    },
    {
        path: '/contact',
        component: Contact,
        fetchInitialData: getContact
    }
];

export default routes;