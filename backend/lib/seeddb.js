const { Datapoint } = require('db/models/datapoint');
const { User } = require('db/models/user');
const {
  hashPasswordSync,
} = require('api/auth/auth.util');

const users = [
  {
    username: 'user1',
    password: hashPasswordSync('user1'),
  },
  {
    username: 'user2',
    password: hashPasswordSync('user2'),
  },
];

const initDb = () => {
  User.collection.insertMany(users, {}, () => {
    console.log('db seeded');
  });
};
const seedDb = () => {
  Datapoint.deleteMany({})
    .then(() => {
      User.deleteMany({})
        .then(() => {
          initDb();
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });

};
module.exports = seedDb;
