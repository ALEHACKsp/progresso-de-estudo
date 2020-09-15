import { createConnection } from 'typeorm';
import { User } from '../entity/User';
import SQLException from '../../interfaces/SQLException';

class UserRepository {
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
}

export default UserRepository;
