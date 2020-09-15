import * as bcrypt from 'bcrypt';

class PasswordUtil {
  static hashPassoword(password: String) {
    return bcrypt.hashSync(password, 10);
  }
}

export default PasswordUtil;