const express = require('express');
const router = express.Router();
const spaceController = require('../controllers/spaceController');
const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');
const { spaceValidator } = require('../validators/spaceValidator');
const validate = require('../middleware/validationMiddleware');

router.get('/', spaceController.getSpaces);
router.post('/', auth, requireAdmin, spaceValidator, validate, spaceController.createSpace);

module.exports = router;