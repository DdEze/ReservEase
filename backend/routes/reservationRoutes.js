const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/authMiddleware');
const { reservationValidator } = require('../validators/reservationValidator');
const validate = require('../middleware/validationMiddleware');

router.post('/', auth, reservationValidator, validate, reservationController.createReservation);
router.get('/mine', auth, reservationController.getMyReservations);

module.exports = router;