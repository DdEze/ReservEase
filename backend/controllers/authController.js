const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generarToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
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

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};

const updateUserRole = async (req, res) => {
  const { role } = req.body;

  if (!['user', 'admin'].includes(role)) {
    return res.status(400).json({ message: 'Rol inválido' });
  }

  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.role = role;
    await user.save();
    res.json({ message: 'Rol actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar rol' });
  }
};

module.exports = { register, login, getAllUsers, updateUserRole };