import { Console } from 'console';
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

  static async getSubject(subjectId: Number, userId: Number) {
    const connection = await createConnection();

    try {
      const subject = await connection
        .getRepository(Subject)
        .createQueryBuilder('subjects')
        .leftJoinAndSelect('subjects.user', 'users')
        .where('subjects.id LIKE :subjectId', { subjectId })
        .andWhere('subjects.userId = :userId', { userId })
        .getOne();

      await connection.close();

      return subject;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return err;
    }
  }

  static async delete(subject: Subject) {
    const connection = await createConnection();

    try {
      await connection
        .manager
        .createQueryBuilder()
        .delete()
        .from(Subject, 'subjects')
        .where('id = :id', { id: subject.id })
        .andWhere('userId = :userId', { userId: subject.user.id })
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

  static async getAllFromUser(userId: Number) {
    const connection = await createConnection();

    try {
      const subjects = await connection
        .getRepository(Subject)
        .createQueryBuilder('subjects')
        .where('userId = :userId', { userId })
        .getMany();

      await connection.close();

      return subjects;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return err;
    }
  }
}

export default UserRepository;
