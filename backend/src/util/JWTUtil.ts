import * as jwt from 'jsonwebtoken';

class JWTUtil {
  static createToken(id: number) {
    const token = jwt.sign({ id }, process.env.PRIVATE_KEY, { algorithm: 'HS512' });

    return token;
  }
}

export default JWTUtil;
