const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const tagSchema = new mongoose.Schema({
  tagname: String,
  mentor_id: {
    type: Schema.Types.ObjectId,

    ref: 'Mentor',

    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Tag', tagSchema);
