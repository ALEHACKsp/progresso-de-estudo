import { NextFunction, Request, Response } from "express";
import JWTUtil from "../../util/JWTUtil";

class LoginMiddleware {
  static async userIsLogged(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
      return response.status(401).json({ err: 'You are not logged in. Enter the token to continue.' });
    }

    else if (!JWTUtil.isTokenValid(token)) {
      return response
        .status(401)
        .json({ 
          err: 'Your token has expired. Please generate and report a new one to continue.' 
      });
    }
    
    else {
      return next();
    }
  }
}

export default LoginMiddleware;