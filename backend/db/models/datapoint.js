const mongoose = require('mongoose');


const DatapointSchema = new mongoose.Schema({
  x: Number,
  y: Number,
  z: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});


const Datapoint = mongoose.model('Datapoint', DatapointSchema);

exports.Datapoint = Datapoint;
