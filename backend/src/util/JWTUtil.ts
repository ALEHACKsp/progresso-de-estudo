import * as jwt from 'jsonwebtoken';

class JWTUtil {
  static createToken(id: Number) {
    const token = jwt.sign({ userId: id }, '123', { algorithm: 'RS512' });

    return token;
  }
}

export default JWTUtil;
