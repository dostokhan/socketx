const httpStatus = require('http-status');
// const passport = require('passport');
const expressJwt = require('express-jwt');


const {
  jwtSecret,
} = require('../../config/vars');

exports.authorize = (credentialsRequired = true) =>
  expressJwt({
    secret: jwtSecret,
    requestProperty: 'auth',
    credentialsRequired,
    // fail: (req, res) => {
    //   res.send(401);
    // },
    getToken: (req, res) => {

      if (req.headers['mj-token']) {
        return req.headers['mj-token'];
      }

      return null;
    },
  });

