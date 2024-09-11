const express = require('express');
const router = express.Router();
const Genero = require('../models/Genero');
const{validationResult, check} = require('express-validator');

router.get('/', async (req, res) => {
  try {
    const generos = await Genero.find();
    res.json(generos); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo géneros' }); 
  }
});
router.post('/', [
  check('name', 'Nombre del género es obligatorio').not().isEmpty(),
  check('status', 'Estado del género debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }
    
    const newGenero = new Genero({
      name: req.body.name,
      status: req.body.status,
      description: req.body.description || '', 
    });

    const savedGenero = await newGenero.save();
    res.status(201).json(savedGenero); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creando género' });
  }
});

//put
router.put('/:id', [
  check('name', 'Nombre del género es obligatorio').not().isEmpty(),
  check('status', 'Estado del género debe ser "Activo" o "Inactivo"').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()   
 });
    }

    const { id } = req.params;   

    const { name, status, description } = req.body;

    const updatedGenero = await Genero.findByIdAndUpdate(
      id,
      { name, status, description },
      { new: true } // Retorna el documento actualizado
    );

    if (!updatedGenero) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }

    res.json(updatedGenero);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando género' });
  }
});

//delete

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGenero = await Genero.findByIdAndDelete(id);

    if (!deletedGenero) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }

    res.json({ message: 'Género eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error eliminando género' });
  }
});

module.exports = router;

