const { User } = require('db/models/user');
const { Datapoint } = require('db/models/datapoint');
const socket = require('lib/socket');

const randomNumber = (range = 5) => (Math.floor(Math.random() * range) + 1);
const randomMilliSeconds = (range = 5) =>  randomNumber(range) * 1000;

const generateData = () => {
  User.find()
    .then((users) => {
      if (users.length > 0) {
        const randomIndex = randomNumber(users.length ) - 1;
        const user = users[randomIndex];

        const newDatapoint = new Datapoint({
          x: randomNumber(100),
          y: randomNumber(100),
          z: randomNumber(100),
          user: user._id,
        });

        newDatapoint.save()
          .then((datapoint) => {
            console.log('new datapoint created');
            const connection = socket.connection();
            if (connection) {
              connection.sendEvent("newDatapoints", JSON.stringify({
                _id: datapoint._id,
                x: datapoint.x,
                y: datapoint.y,
                z: datapoint.z,
                user: user,
              }));
            } else  {
              console.log('NO CONNECTION');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });

  const milliseconds = randomMilliSeconds();
  console.log('timer: ' + milliseconds + ' milliseconds');

  setTimeout(generateData, milliseconds);
};

const initPersonData = () => {
  const milliseconds = randomMilliSeconds();
  setTimeout(generateData, milliseconds)
};

exports.initPersonData = initPersonData;
