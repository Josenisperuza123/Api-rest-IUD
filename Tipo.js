const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const TipoSchema = new Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Tipo', TipoSchema);
