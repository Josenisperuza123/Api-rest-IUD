const express = require('express');
const router = express.Router();
const Director = require('../models/Director'); // Assuming your model file is named Director.js
const { validationResult, check } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo directores' });
  }
});

router.post('/', [
  check('name', 'Nombre del director es obligatorio').not().isEmpty(),
  check('status', 'Estado del director debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }

    const   
 newDirector = new Director({
      name: req.body.name,
      status: req.body.status|| '',
    });

    const savedDirector = await newDirector.save();
    res.status(201).json(savedDirector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando director' });
  }
});

// PUT route
router.put('/:id', [
  check('name', 'Nombre del director es obligatorio').not().isEmpty(),
  check('status', 'Estado del director debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }

    const { id } = req.params;   


    const { name, status, description } = req.body;

    const updatedDirector = await Director.findByIdAndUpdate(
      id,
      { name, status },
      { new: true } 
    );

    if (!updatedDirector) {
      return res.status(404).json({ message: 'Director no encontrado' });
    }

    res.json(updatedDirector);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando director' });
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDirector = await Director.findByIdAndDelete(id);

    if (!deletedDirector) {
      return res.status(404).json({ message:   
 'Director no encontrado' });
    }

    res.json({ message: 'Director eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando director' });
  }
});

module.exports = router;