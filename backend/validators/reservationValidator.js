const { body } = require('express-validator');

exports.reservationValidator = [
  body('space').notEmpty().withMessage('El espacio es obligatorio'),
  body('date')
    .isISO8601()
    .withMessage('La fecha debe ser válida (YYYY-MM-DD)')
    .custom((value) => {
      const inputDate = new Date(value);
      const now = new Date();
      if (inputDate < now.setHours(0, 0, 0, 0)) {
        throw new Error('La fecha debe ser futura');
      }
      return true;
    }),
  body('timeStart').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora de inicio inválida'),
  body('timeEnd').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Hora de fin inválida'),
  body('note').optional().isLength({ max: 300 }).withMessage('La nota no puede superar los 300 caracteres'),
];