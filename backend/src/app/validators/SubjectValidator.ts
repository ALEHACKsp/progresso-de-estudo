import { body, param } from 'express-validator';

export default {
  create: [
    body('name').notEmpty().isString().isLength({ max: 255 })
  ],

  delete: [
    param('subjectId').notEmpty().isNumeric()
  ]
}
