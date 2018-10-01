const httpStatus = require('http-status');
const bcrypt = require('bcrypt');
const { User } = require('db/models/user');
const { Datapoint } = require('db/models/datapoint');

const {
  getSignedToken,
  hashPassword,
} = require('./auth.util');

exports.clear = (req, res, next) => {
  Datapoint.deleteMany({})
    .then(() => {
      User.deleteMany({})
        .then(() => {
          res.send({ msg: 'done' });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

exports.signup = async (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`signUp user: ${username}`);

  const hashedPassword = await hashPassword(password);
  const newUser = new User({
    username,
    password: hashedPassword,
  });


  newUser.save()
    .then((user) => {
      const token = getSignedToken({ id: user.id, username: user.username });
      res.status(httpStatus.OK).send({ token });
    })
    .catch((err) => {
      console.log(err);
      next(err);
      // res.status(httpStatus.NOT_FOUND).send({ msg: 'Failed' });
    })
};



exports.signin = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(`signIn user: ${username}`);

  User.findOne({ username: username })
    .then((user) => {
      bcrypt.compare(password, user.password, (err, check) => {
        if (err) {
          res.status(httpStatus.NOT_FOUND).send({ msg: 'Failed' });
        } else if (check) {
          const token = getSignedToken({ id: user.id, username: user.username });
          res.status(httpStatus.OK).send({ token });
        } else {
          res.status(httpStatus.NOT_FOUND).send({ msg: 'Failed' });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      next(err);
      // res.status(httpStatus.NOT_FOUND).send({ msg: 'Failed' });
    });
};
