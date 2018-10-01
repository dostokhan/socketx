const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 5;

const {
  jwtSecret,
} = require('config/vars');

const getSignedToken = auth =>
  jwt.sign(
    auth,
    jwtSecret,
    {
      expiresIn: '6h',
    },
  );

const hashPasswordSync = password =>
  bcrypt.hashSync(password, SALT_ROUNDS);

const hashPassword = async password => {
  try {
    var hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch(error) {
    throw Error(error);
  }
};

module.exports = {
  getSignedToken,
  hashPasswordSync,
  hashPassword,
};

