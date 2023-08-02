import Home from '../src/components/Home';
import About from '../src/components/About';

// Desc: Routes for the application
const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    }
];

export default routes;