const express = require('express');
const router = express.Router();
const Tipo = require('../models/Tipo'); 
const { validationResult, check } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const tipos = await Tipo.find(); 
    res.json(tipos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo tipos' });
  }
});

router.post('/', [
  check('name', 'Nombre del tipo es obligatorio').not().isEmpty(),
  check('description', 'Descripción del tipo es obligatorio').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const   
 newTipo = new Tipo({
      name: req.body.name,
      // Add other fields if needed (description, etc.)
      description: req.body.description || '',
    });

    const savedTipo = await newTipo.save();
    res.status(201).json(savedTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando tipo' });
  }
});

// PUT route
router.put('/:id', [
  check('name', 'Nombre del tipo es obligatorio').not().isEmpty(),
  check('description', 'Descripción del tipo es obligatorio').not().isEmpty(),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const   
 { id } = req.params;

    const { name, description } = req.body;   


    const updatedTipo = await Tipo.findByIdAndUpdate(
      id,
      { name, description }, 
      { new: true } 
    );

    if (!updatedTipo) {
      return res.status(404).json({ message: 'Tipo no encontrado' });
    }

    res.json(updatedTipo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando tipo' });
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTipo = await Tipo.findByIdAndDelete(id);

    if (!deletedTipo) {
      return res.status(404).json({ message: 'Tipo no encontrado' });
    }

    res.json({ message: 'Tipo eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando tipo' });
  }
});

module.exports = router;