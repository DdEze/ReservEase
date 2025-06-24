const Reservation = require('../models/Reservation');

const createReservation = async (req, res) => {
  const { space, date, timeStart, timeEnd, note } = req.body;

  try {
    const overlapping = await Reservation.findOne({
      space,
      date,
      $or: [
        {
          timeStart: { $lt: timeEnd },
          timeEnd: { $gt: timeStart }
        }
      ]
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Ya existe una reserva que se superpone con ese horario.' });
    }

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

const getMyReservations = async (req, res) => {
  try {
    const reservas = await Reservation.find({ user: req.user.id }).populate('space');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error obteniendo reservas', error });
  }
};

const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) return res.status(404).json({ message: 'Reserva no encontrada' });
    if (reservation.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'No autorizado' });

    await reservation.deleteOne();
    res.json({ message: 'Reserva cancelada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar la reserva' });
  }
};


module.exports = { createReservation, getMyReservations, deleteReservation };