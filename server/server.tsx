import express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import App from '../src/components/App'
import path from 'path';
import fs from 'fs';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes, { Path } from '../src/shared/routes';
import Firebase from '../src/components/Firebase';
import firebaseInstance from '../src/components/Firebase/config';

const server = express();

server.use('/static', express.static('./build/static'));
server.use('/favicon.ico', express.static('./build/favicon.ico'));
server.use('/manifest.json', express.static('./build/manifest.json'));

server.get('*', (req, res, next) => {

  const activeRoute = routes.find((route) =>
    matchPath(route.path, req.url)
  )

  const firebase = new Firebase('en', firebaseInstance.database());

  if (!activeRoute) {
    return next();
  }

  // We have check the for validity of the path,
  // so we can cast it to Path.
  const ourPath: Path = req.path as Path;
  console.log('req.path', req.path);
  console.log('ourPath', ourPath);

  activeRoute
    .fetchInitialData(ourPath, firebase)
    .then((initialData) => {

      console.log('data', initialData);
      console.log('data, stringify', JSON.stringify(initialData));

      const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
          <App initialData={initialData} />
        </StaticRouter>
      );
    
      const indexFile = path.resolve('./build/index.html');
    
      fs.readFile(indexFile, 'utf8', (err, data) => {
        if (err) {
          console.error('Something went wrong:', err);
          return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(
          data
            .replace(
              '<div id="root"></div>', 
              `<div id="root">${app}</div>`
            )
            .replace(
              '<script id="initial-data"></script>', 
              `<script>
                window.__DATA__=${JSON.stringify(initialData)}
              </script>`
            )
        );
      });
    })
    .catch(next);
});
// Run on PORT 3002 unless SETOELKAHFI_COM_PORT is set
const port = process.env.SETOELKAHFI_COM_PORT || 3002;

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})