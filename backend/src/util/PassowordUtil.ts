import * as bcrypt from 'bcrypt';

class PasswordUtil {
  static hashPassword(password: String) {
    return bcrypt.hashSync(password, 10);
  }

  static isValidPassword(password: string, hashedPassword: string) {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default PasswordUtil;