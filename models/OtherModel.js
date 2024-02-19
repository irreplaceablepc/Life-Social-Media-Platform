// models/OtherModel.js
const mongoose = require('mongoose');

const otherModelSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('OtherModel', otherModelSchema);
