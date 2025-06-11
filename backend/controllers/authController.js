const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generarToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

const register = async (req, res) => {
  const { name, surname, email, password } = req.body;

  try {
    let usuarioExistente = await User.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'El correo ya está registrado.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, surname, email, passwordHash });
    await newUser.save();

    const token = generarToken(newUser);
    res.status(201).json({ 
      token, 
      user: { name, surname, email, role: newUser.role } 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el registro', error });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario) return res.status(400).json({ message: 'Usuario no encontrado' });

    const valido = await usuario.comparePassword(password);
    if (!valido) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generarToken(usuario);
    res.status(200).json({ token, user: { name: usuario.name, surname: usuario.surname, email, role: usuario.role } });
  } catch (error) {
    res.status(500).json({ message: 'Error en el login', error });
  }
};

module.exports = { register, login };