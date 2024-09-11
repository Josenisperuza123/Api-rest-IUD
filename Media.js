const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model;

const MediaSchema = new Schema({
  serial: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  synopsis: { type: String },
  url: { type: String, unique: true, required: true },
  coverImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  releaseYear: { type: Number },
  genero: { type: Schema.Types.ObjectId, ref: 'Genero' },
  director: { type: Schema.Types.ObjectId, ref: 'Director' },
  productora: { type: Schema.Types.ObjectId, ref: 'Productora' },
  tipo: { type: Schema.Types.ObjectId, ref: 'Tipo' }
});

module.exports = mongoose.model('Media', MediaSchema);
