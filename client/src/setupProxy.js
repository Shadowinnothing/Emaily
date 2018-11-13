// this file is used to setup the proxy so that the
// client server on localhost:3000 and the express server on localhost:5000
// communicate with eachother

const proxy = require('http-proxy-middleware');

const expressServer = 'http://localhost:5000';

module.exports = (app) => {
  app.use(proxy('/auth/google', {target: expressServer}))
  app.use(proxy('/api/*', {target: expressServer}))
};
