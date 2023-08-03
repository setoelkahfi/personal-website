import Home from '../components/Home';
import About from '../components/About';
import React from 'react';
import { getCaraousel } from './api';

export interface Route {
    path: string;
    component: React.ComponentType<any>;
    fetchInitialData?: (path?: string) => Promise<any>;
}

// Desc: Routes for the application
const routes: Route[]  = [
    {
        path: '/',
        component: Home,
        fetchInitialData: (path = '') => getCaraousel()
    },
    {
        path: '/about',
        component: About,
        fetchInitialData: (path = '') => Promise.resolve()
    },
    {
        path: '/cv',
        component: About,
        fetchInitialData: (path = '') => Promise.resolve()
    }
];

export default routes;