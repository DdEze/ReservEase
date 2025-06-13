const Reservation = require('../models/Reservation');

const getAllReservations = async (req, res) => {
  try {
    const reservas = await Reservation.find().populate('user space');
    res.status(200).json(reservas);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener reservas', err });
  }
};

module.exports = { getAllReservations };