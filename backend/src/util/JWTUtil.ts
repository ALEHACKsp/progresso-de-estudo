import * as jwt from 'jsonwebtoken';
import UserRepository from '../app/repository/UserRepository';
import JWTObject from '../interfaces/JWTObject';

class JWTUtil {
  static expireTime = 60*60*24;
    
  static createToken(id: number) {
    const token = jwt.sign({ id }, process.env.PRIVATE_KEY, { algorithm: 'HS512', expiresIn: this.expireTime });

    return token;
  }

  static async getUser(token: string) {
    try { 
      const { id } = jwt.verify(token, process.env.PRIVATE_KEY) as JWTObject;
      const user = await UserRepository.getUserById(id);

      return user;
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }
}

export default JWTUtil;
