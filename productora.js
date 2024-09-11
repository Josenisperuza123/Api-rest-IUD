
const express = require('express');
const router = express.Router();
const Productora = require('../models/Productora'); // Asegúrate de que el modelo se llame Productora.js
const { validationResult, check } = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const productoras = await Productora.find();
    res.json(productoras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo productoras' });
  }
});

router.post('/', [
  check('name', 'Nombre de la productora es obligatorio').not().isEmpty(),
  check('status', 'Estado de la productora debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }

    const   
 newProductora = new Productora({
      name: req.body.name,
      status: req.body.status|| '',
    });

    const savedProductora = await newProductora.save();
    res.status(201).json(savedProductora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando productora' });
  }
});

// PUT route
router.put('/:id', [
  check('name', 'Nombre de la productora es obligatorio').not().isEmpty(),
  check('status', 'Estado de la productora debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }

    const { id } = req.params;   


    const { name, status } = req.body;

    const updatedProductora = await Productora.findByIdAndUpdate(
      id,
      { name, status},
      { new: true } 
    );

    if (!updatedProductora) {
      return res.status(404).json({ message: 'Productora no encontrada' });
    }

    res.json(updatedProductora);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando productora' });
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductora = await Productora.findByIdAndDelete(id);

    if (!deletedProductora) {
      return res.status(404).json({ message: 'Productora no encontrada' });
    }

    res.json({ message: 'Productora eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando productora' });
  }
});

module.exports = router;