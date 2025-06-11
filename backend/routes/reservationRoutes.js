const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations, deleteReservation } = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { reservationValidator } = require('../validators/reservationValidator');
const validate = require('../middleware/validationMiddleware');

router.post('/', auth, reservationValidator, validate, createReservation);
router.get('/mine', auth, getMyReservations);
router.delete('/:id', auth, deleteReservation);

module.exports = router;