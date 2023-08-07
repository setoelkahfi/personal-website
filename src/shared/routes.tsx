import Home from '../components/Home';
import About from '../components/About';
import React from 'react';
import { getCaraousel } from './api';
import Contact from '../components/Contact';
import Cv from '../components/Cv';

export interface Route {
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
    fetchInitialData?: (path?: string) => Promise<any>;
}

// Desc: Routes for the application
const routes: Route[]  = [
    {
        path: '/',
        component: Home,
        exact: true,
        fetchInitialData: () => getCaraousel()
    },
    {
        path: '/about',
        component: About,
        fetchInitialData: () => Promise.resolve()
    },
    {
        path: '/cv',
        component: Cv,
        fetchInitialData: () => Promise.resolve()
    },
    {
        path: '/contact',
        component: Contact,
        fetchInitialData: () => Promise.resolve()
    }
];

export default routes;