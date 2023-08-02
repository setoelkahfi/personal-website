import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/components/App'
import path from 'path';
import fs from 'fs';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from '../shared/routes';

const server = express();

server.use('/static', express.static('./build/static'));
server.use('/favicon.ico', express.static('./build/favicon.ico'));
server.use('/manifest.json', express.static('./build/manifest.json'));

server.get('*', (req, res, next) => {

  const activeRoute = routes.find((route) =>
    matchPath(route.path, req.url)
  ) || {}

  const app = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const indexFile = path.resolve('./build/index.html');

  fs.readFile(indexFile, 'utf8', (err, data) => {
    if (err) {
      console.error('Something went wrong:', err);
      return res.status(500).send('Oops, better luck next time!');
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
    );
  });
});
 
server.listen(3002, () => {
  console.log(`Server running on http://localhost:3002`)
})