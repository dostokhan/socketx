const {
  port,
} = require('./config/vars');
/**
 * Express configuration.
 */
const server = require('./config/express');


server.listen(port, () => {
  console.warn('we are ready :)');
});
