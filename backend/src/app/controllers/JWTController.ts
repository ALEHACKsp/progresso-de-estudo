import { Request, Response } from "express";
import JWTUtil from '../../util/JWTUtil';
import UserRepository from '../repository/UserRepository';

class JWTController {
  static async getToken(request: Request, response: Response) {
    const { email, password } 
      : { email: string, password: string } = request.body;

    const user = await UserRepository.getUserFromLogin(email, password);
    
    if (!user) {
      return response.status(403).json({ err: 'Invalid login' });
    }
    const token = JWTUtil.createToken(user.id as number);

    return response.status(200).json({ token, expireIn: `${JWTUtil.expireTime}s` });
  }
}

export default JWTController;
