const express = require('express');
const compression = require('compression');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const routes = require('./routes');

const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  if (process.env.NODE_ENV === 'production') {
    server.use(compression());
  }

  server.use(handler).listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost :${process.env.PORT}`);
  });

});
