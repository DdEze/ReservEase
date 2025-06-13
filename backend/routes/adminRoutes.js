const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');
const { getAllReservations } = require('../controllers/adminController');

router.get('/reservations', auth, requireAdmin, getAllReservations);

module.exports = router;