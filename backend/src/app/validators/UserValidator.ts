import { body, header } from 'express-validator';

export default {
  create: [
    body('name').notEmpty().isString().isLength({ max: 255 }),
    body('email').notEmpty().isString().isLength({ max: 255 }),
    body('password').notEmpty().isString().isLength({ max: 255 })
  ],
}
