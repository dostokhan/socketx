const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
// const passport = require('passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const {
  errorHandler,
} = require('api/middlewares/error');
const routes = require('api/routes/v1');
const {
  corsOrigin,
} = require('config/vars');

const {
  initPersonData,
} = require('lib/job');
const socket = require('lib/socket');
const seedDb = require('lib/seeddb');

// create express server
const server = express();

socket.connect(server);
// enable authentication with passport
// server.use(passport.initialize());

// const strategies = require('./passport');
// passport.use(strategies.jwt);

// request logging. dev: console | production: file
server.use(morgan('combined'));


// parse body params and attache them to req.body
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
// cookie par
server.use(cookieParser());
server.disable('x-powered-by');
// gzip compression
server.use(compression());

// enable CORS - Cross Origin Resource Sharing
server.use(
  cors({
    origin(origin, cb) {
      const whitelist = corsOrigin
        ? corsOrigin.split(',')
        : [];
      cb(null, whitelist.includes(origin));
    },
    methods: 'GET, POST, PATCH, DELETE',
    // exposeHeaders: ['mj-token'],
    credentials: true,
  })
);


//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/socketx';
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// seed database
seedDb();

server.use('/v1', routes);

server.use(errorHandler);

initPersonData();

module.exports = server;

