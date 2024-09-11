const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const ProductoraSchema = new Schema({
  name: { type: String, required: true },
  status: { type: String, enum: ['Activo', 'Inactivo'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  slogan: { type: String },
  description: { type: String }
});

module.exports = mongoose.model('Productora', ProductoraSchema);
