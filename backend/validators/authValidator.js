const { body } = require('express-validator');

const registerValidator = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('surname').notEmpty().withMessage('El apellido es obligatorio'),
  body('email').isEmail().withMessage('El email no es válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

module.exports = { registerValidator };