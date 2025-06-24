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

  body('timeStart')
    .matches(/^([0-1]?[0-9]|2[0-3]):(00|30)$/)
    .withMessage('Hora de inicio inválida. Solo se permiten minutos 00 o 30 y hora entre 08:00 y 23:00')
    .custom((value) => {
      const [h] = value.split(':').map(Number);
      if (h < 8 || h > 22) {
        throw new Error('Hora de inicio fuera del horario permitido (08:00 - 23:00)');
      }
      return true;
    }),

  body('timeEnd')
    .matches(/^([0-1]?[0-9]|2[0-3]):(00|30)$/)
    .withMessage('Hora de fin inválida. Solo se permiten minutos 00 o 30 y hora entre 08:00 y 23:00')
    .custom((value, { req }) => {
      const [h1, m1] = req.body.timeStart.split(':').map(Number);
      const [h2, m2] = value.split(':').map(Number);
      const start = h1 * 60 + m1;
      const end = h2 * 60 + m2;
      if (end <= start) {
        throw new Error('La hora de fin debe ser posterior a la hora de inicio');
      }
      return true;
    }),

  body('note')
    .optional()
    .isLength({ max: 300 })
    .withMessage('La nota no puede superar los 300 caracteres'),
];