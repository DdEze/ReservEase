const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');
const { registerValidator } = require('../validators/authValidator');
const validate = require('../middleware/validationMiddleware');

router.post('/register', registerValidator, validate, registerUser);
router.post('/login', loginUser);
router.delete('/delete/:email', authMiddleware, requireAdmin, async (req, res) => {
  try {
    const deleted = await User.findOneAndDelete({ email: req.params.email });
    if (!deleted) return res.status(404).json({ message: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error eliminando usuario', error });
  }
});

module.exports = router;