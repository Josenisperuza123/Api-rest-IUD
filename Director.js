const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const DirectorSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Activo', 'Inactivo'], default: 'Activo' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Director', DirectorSchema);
