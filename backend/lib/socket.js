const socketIO = require('socket.io')
const http = require('http')
// const { User } = require('db/models/user');
const { Datapoint } = require('db/models/datapoint');

const port = 4004;

let connection = null;

class Socket {
  constructor() {
    this._socket = null;
  }
  connect(expressApp) {
    const server = http.createServer(expressApp);
    const io = socketIO(server);

    // This is what the socket.io syntax is like, we will work this later
    io.on('connection', (socket) => {
      this._socket = socket;
      console.log('User connected')

      socket.on('disconnect', () => {
        console.log('user disconnected')
      });
    })

    io.on('connect', (socket) => {
      console.log('send initial data');
      // Send ehlo event right after connect:
      Datapoint.find().populate('user')
        .then((users) => {
          socket.emit('datapoints', JSON.stringify(users));
        })
        .catch((err) => {
          console.log(err);
        });
    });

    server.listen(port, () => console.log(`Socket Listening on port ${port}`))
  }

  sendEvent(event, data) {
    this._socket.emit(event, data);
  }

  static init(server) {
    if(!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }

  static getConnection() {
    if(!connection) {
      return null;
    }
    return connection;
  }
}

module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection,
};

