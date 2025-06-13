const Space = require('../models/Space');

const getSpaces = async (req, res) => {
  try {
    const espacios = await Space.find();
    res.json(espacios);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo espacios', error });
  }
};

const getSpaceById = async (req, res) => {
  try {
    const espacio = await Space.findById(req.params.id);
    if (!espacio) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener espacio', error });
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

const updateSpace = async (req, res) => {
  try {
    const espacio = await Space.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!espacio) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json(espacio);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando espacio', error });
  }
};

const deleteSpace = async (req, res) => {
  try {
    const eliminado = await Space.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Espacio no encontrado' });
    res.json({ message: 'Espacio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando espacio', error });
  }
};

module.exports = {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace
};