const Space = require('../models/Space');

const getSpaces = async (req, res) => {
  try {
    const espacios = await Space.find();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo espacios', error });
  }
};

const createSpace = async (req, res) => {
  const { name, location, capacity, description } = req.body;
  try {
    const nuevo = new Space({ name, location, capacity, description });
    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: 'Error creando espacio', error });
  }
};

module.exports = { getSpaces, createSpace };