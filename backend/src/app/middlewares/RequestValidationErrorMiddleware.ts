import { validationResult } from 'express-validator';
import { NextFunction, Request, Response } from 'express';

class RequestValidationErrorMiddleware {
  static async hasError(request: Request, response: Response, next: NextFunction) {
    const errors = validationResult(request);

    if (errors.isEmpty()){
      return next();
    }
    else {
      return response.status(406).json({ err: [...errors.array()] });
    }
  }
}

export default RequestValidationErrorMiddleware;
