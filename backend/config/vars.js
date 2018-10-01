const path = require('path');
const dotenv = require('dotenv');

const envFile = process.env.NODE_ENV === 'production' ?
  '../.env.production' :
  '../.env.development';

// console.log('env file' + envFile);
dotenv.load({ path: path.join(__dirname, envFile) });


// import .env variables
// require('dotenv-safe').load({
//   path: path.join(__dirname, '../../.env'),
//   sample: path.join(__dirname, '../../.env.example'),
// });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN,
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
