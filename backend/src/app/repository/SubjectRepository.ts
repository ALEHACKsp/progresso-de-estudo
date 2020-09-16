import { createConnection } from 'typeorm';
import { Subject } from '../entity/Subject';
import { User } from '../entity/User';

class UserRepository {
  static async create(subject: Subject) {
    const connection = await createConnection();

    try {
      const { id } = await connection.manager.save(subject);

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
