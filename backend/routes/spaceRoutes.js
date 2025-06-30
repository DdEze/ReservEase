const express = require('express');
const router = express.Router();
const {
  getSpaces,
  getSpaceById,
  createSpace,
  updateSpace,
  deleteSpace,
  getAvailableSpaces
} = require('../controllers/spaceController');

const auth = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/requireAdmin');
const { spaceValidator } = require('../validators/spaceValidator');
const validate = require('../middleware/validationMiddleware');

router.get('/', getSpaces);
router.get('/available', getAvailableSpaces);
router.get('/:id', getSpaceById);
router.post('/', auth, requireAdmin, spaceValidator, validate, createSpace);
router.put('/:id', auth, requireAdmin, spaceValidator, validate, updateSpace);
router.delete('/:id', auth, requireAdmin, deleteSpace);

module.exports = router;