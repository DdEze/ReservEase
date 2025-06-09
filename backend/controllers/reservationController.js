const Reservation = require('../models/Reservation');

exports.createReservation = async (req, res) => {
  const { space, date, timeStart, timeEnd, note } = req.body;
  try {
    const reserva = new Reservation({
      user: req.user.id,
      space,
      date,
      timeStart,
      timeEnd,
      note
    });
    await reserva.save();
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ message: 'Error creando reserva', error });
  }
};

exports.getMyReservations = async (req, res) => {
  try {
    const reservas = await Reservation.find({ user: req.user.id }).populate('space');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo reservas', error });
  }
};
