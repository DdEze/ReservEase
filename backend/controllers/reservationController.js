const Reservation = require('../models/Reservation');
const dayjs = require('dayjs');


const createReservation = async (req, res) => {
  let { space, date, timeStart, timeEnd, note } = req.body;

  try {
    const parsedDate = dayjs(date).startOf('day').toDate();

    const existingReservations = await Reservation.find({
      space,
      date: parsedDate
    });

    const startMinutes = parseInt(timeStart.split(':')[0]) * 60 + parseInt(timeStart.split(':')[1]);
    const endMinutes = parseInt(timeEnd.split(':')[0]) * 60 + parseInt(timeEnd.split(':')[1]);

    // Validación: hora de fin debe ser mayor a hora de inicio
    if (endMinutes <= startMinutes) {
      return res.status(400).json({ message: 'La hora de fin debe ser posterior a la hora de inicio' });
    }

    const overlapping = existingReservations.some((res) => {
      const resStart = parseInt(res.timeStart.split(':')[0]) * 60 + parseInt(res.timeStart.split(':')[1]);
      const resEnd = parseInt(res.timeEnd.split(':')[0]) * 60 + parseInt(res.timeEnd.split(':')[1]);

      // Si hay cualquier cruce
      return startMinutes < resEnd && endMinutes > resStart;
    });

    if (overlapping) {
      return res.status(400).json({ message: 'Ya existe una reserva que se superpone con ese horario.' });
    }

    const reserva = new Reservation({
      user: req.user.id,
      space,
      date: parsedDate,
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

const getAllReservations = async (req, res) => {
  try {
    const reservas = await Reservation.find()
      .populate('space')
      .populate('user', 'name surname email');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todas las reservas', error });
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

const deleteReservationAdmin = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    const isAdmin = req.user.role === 'admin';
    const isOwner = reservation.user.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'No autorizado' });
    }

    await reservation.deleteOne();
    res.json({ message: 'Reserva cancelada correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al cancelar la reserva', error: err.message });
  }
};

module.exports = { createReservation, getMyReservations, deleteReservation, getAllReservations, deleteReservationAdmin };