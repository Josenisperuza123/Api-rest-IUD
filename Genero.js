const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const GeneroSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  description: { type: String }
});

module.exports = mongoose.model('Genero', GeneroSchema);
