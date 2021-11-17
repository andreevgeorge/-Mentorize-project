const { Schema, model } = require('mongoose');
// const { mongoose } = require('mongoose');

const mentorSchema = new Schema({
  login: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  aboutMe: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  stack: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }]
  ,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Mentor', mentorSchema);
