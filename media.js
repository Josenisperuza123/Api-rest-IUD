const express = require('express');
const { Schema, mongoose} = require('mongoose');
const { validationResult, check } = require('express-validator');

const router = express.Router();

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


const Media = mongoose.model('Media', MediaSchema);

router.get('/', async (req, res) => {
    try {
        const medias = await Media.find().populate('genero director productora tipo'); 
        res.json(medias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo medios' });
    }
});


router.post('/', [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('url', 'La URL es obligatoria').not().isEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const   
 newMedia = new Media(req.body);
        const savedMedia = await newMedia.save();
        res.status(201).json(savedMedia);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creando medio' });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate('genero director productora tipo');
        if (!media) {
            return res.status(404).json({ message: 'Medio no encontrado' });
        }
        res.json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error obteniendo medio' });
    }
});


router.put('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!media) {
            return res.status(404).json({   
 message: 'Medio no encontrado' });
        }
        res.json(media);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error actualizando medio' });
    }
});


router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findByIdAndDelete(req.params.id);
        if (!media) {
            return res.status(404).json({ message:   
 'Medio no encontrado' });
        }
        res.json({ message: 'Medio eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error eliminando medio' });
    }
});

module.exports = router;
