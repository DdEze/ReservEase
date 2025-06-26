const express = require('express');
const router = express.Router();
const { createReservation, getMyReservations, 
    deleteReservation, getAllReservations } = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { reservationValidator } = require('../validators/reservationValidator');
const validate = require('../middleware/validationMiddleware');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/', auth, reservationValidator, validate, createReservation);
router.get('/mine', auth, getMyReservations);
router.delete('/:id', auth, deleteReservation);
router.get('/admin/all', auth, requireAdmin, getAllReservations);

module.exports = router;