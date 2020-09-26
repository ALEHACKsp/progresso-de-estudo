import * as expressValidator from 'express-validator';
import { header } from 'express-validator';

export default {  
  get: [
    expressValidator.body('email').isEmail(),
    expressValidator.body('password').isString(),
  ],

  passedToken: [
    header('authorization').notEmpty().isString(),
  ]
}
