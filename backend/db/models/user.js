const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  datapoints: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Datapoint' }],
});

const User = mongoose.model('User', UserSchema);

exports.User = User;
