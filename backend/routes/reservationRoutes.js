const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations, 
    deleteReservation, getAllReservations, deleteReservationAdmin } = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { reservationValidator } = require('../validators/reservationValidator');
const validate = require('../middleware/validationMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/', auth, reservationValidator, validate, createReservation);
router.get('/mine', auth, getMyReservations);
router.get('/admin/all', auth, requireAdmin, getAllReservations);
router.delete('/:id', auth, deleteReservation);
router.delete('/admin/:id', auth, requireAdmin, deleteReservationAdmin);

module.exports = router;