const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});

mongoose.model('images', imageSchema);
