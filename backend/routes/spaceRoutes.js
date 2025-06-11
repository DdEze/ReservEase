const express = require('express');
const router = express.Router();
const { getSpaces, createSpace } = require('../controllers/spaceController');
const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');
const { spaceValidator } = require('../validators/spaceValidator');
const validate = require('../middleware/validationMiddleware');

router.get('/', getSpaces);
router.post('/', auth, requireAdmin, spaceValidator, validate, createSpace);

module.exports = router;