import * as jwt from 'jsonwebtoken';

class JWTUtil {
  static expireTime = 60*60*24;
    
  static createToken(id: number) {
    const token = jwt.sign({ id }, process.env.PRIVATE_KEY, { algorithm: 'HS512', expiresIn: this.expireTime });

    return token;
  }
}

export default JWTUtil;
