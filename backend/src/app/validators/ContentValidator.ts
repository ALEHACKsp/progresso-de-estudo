import { param, body } from 'express-validator';

export default {
  index: [
    param('subjectId').notEmpty().isNumeric(),
  ],

  store: [
    param('subjectId').notEmpty().isNumeric().isLength({ max: 255 }),
    body('name').notEmpty().isString().isLength({ max: 255 }),
    body('check').notEmpty().isBoolean(),
    body('anotation').isString().isLength({ max: 255 }),
    body('totalQuestions').notEmpty().isNumeric(),
    body('totalHits').notEmpty().isNumeric(),
    body('totalErros').notEmpty().isNumeric(),
  ],

  get: [
    param('contentId').notEmpty().isNumeric(),
  ],

  update: [
    param('subjectId').isNumeric().isLength({ max: 255 }),
    body('name').isString().isLength({ max: 255 }),
    body('check').isBoolean(),
    body('anotation').isString().isLength({ max: 255 }),
    body('totalQuestions').isNumeric(),
    body('totalHits').isNumeric(),
    body('totalErros').isNumeric(),
  ],
  
  delete: [
    param('contentId').notEmpty().isNumeric(),
  ],
}