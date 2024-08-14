import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';
import bootstrap from './src/main.server';
import fs from 'fs';
import compressionModule from 'compression'

// Firebase function URL
const firebaseFunctionUrl = 'https://us-central1-angularblog-267d7.cloudfunctions.net/fetchPostsFromFirestore';

// Function to fetch data from Firebase function
async function fetchPosts() {
  try {
    const response = await fetch(firebaseFunctionUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const data: [{id:string}] = await response.json();
    const postIds = data.map(post => post.id);
    const routes = ['', '/', ...postIds.map(id => `/details/${id}`)];
    console.log('routes rendered:', routes);
    fs.writeFileSync('routes.txt', routes.join('\n'), 'utf8');

  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, '../browser');
  const indexHtml = join(serverDistFolder, 'index.server.html');


  server.use(compressionModule());

  const commonEngine = new CommonEngine();

  server.set('view engine', 'html');
  server.set('views', browserDistFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('**', express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html',
  }));

  // All regular routes use the Angular engine
  server.get('**', (req, res, next) => {
    const { protocol, originalUrl, baseUrl, headers } = req;

    commonEngine
      .render({
        bootstrap,
        documentFilePath: indexHtml,
        url: `${protocol}://${headers.host}${originalUrl}`,
        publicPath: browserDistFolder,
        providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
      })
      .then(html => res.send(html))
      .catch(err => next(err));
  });

  return server;
}

async function run(): Promise<void> {
  fetchPosts();
  const port = process.env['PORT'] || 4000;

  // Generate routes.txt before starting the server

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

run();
