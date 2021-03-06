import { createConnection } from 'typeorm';
import { User } from '../entity/User';
import PasswordUtil from '../../util/PassowordUtil';

class UserRepository {
  static async getUserFromLogin(email: string, password: string) {
    const connection = await createConnection();

    try {
      let user = await connection
        .getRepository(User)
        .createQueryBuilder('users')
        .where('users.email LIKE :email', { email })
        .getOne();

      await connection.close();

      if (!PasswordUtil.isValidPassword(password, user.password as string)) {
        throw new Error("Login invalid");
      }

      return user;
    }
    catch(err) {
      return null;
    }
  }

  static async getUserById(id: Number) {
    const connection = await createConnection();
    
    try {
      const user = await connection
        .getRepository(User)
        .createQueryBuilder('users')
        .where('id = :id', { id })
        .getOne();

      await connection.close();
      return user;
    }
    catch(err) {
      await connection.close();
      return null;
    }
  }

  static async create(user: User) {
    const connection = await createConnection();

    try {
      const { id } = await connection.manager.save(user);

      await connection.close();

      return id ? true : false;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return err;
    }
  }

  static async deleteUserById(id: Number) {
    const connection = await createConnection();

    try {
      await connection.manager
        .createQueryBuilder()
        .delete()
        .from(User, 'users')
        .where('users.id = :id', { id })
        .execute();

      await connection.close();

      return true;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return false;
    }
  }
}

export default UserRepository;
