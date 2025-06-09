const { body } = require('express-validator');

exports.spaceValidator = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('location').notEmpty().withMessage('La ubicación es obligatoria'),
  body('capacity')
    .isInt({ gt: 0 })
    .withMessage('La capacidad debe ser un número entero positivo'),
  body('description').optional().isLength({ max: 500 }).withMessage('La descripción no puede tener más de 500 caracteres'),
];