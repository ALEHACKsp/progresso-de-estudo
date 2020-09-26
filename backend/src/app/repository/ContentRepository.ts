import { createConnection } from 'typeorm';
import { Content } from '../entity/Content';

class ContentRepository {
  static async create(content: Content) {
    const connection = await createConnection();

    try {
      const response = await connection.manager.save(content);

      await connection.close();

      return response ? true: false;
    } catch(err) {
      console.error(err);
      await connection.close();
      return err;
    }
  }

  static async getById(contentId: Number) {
    const connection = await createConnection();

    try {
      const content = await connection
        .getRepository(Content)
        .createQueryBuilder('contents')
        .where('id = :contentId', {contentId})
        .getOne();

      await connection.close();
      
      return content;
    } catch(err) {
      console.log(err);
      await connection.close();
      return err;

    }
  }

  static async getAll(subjectId: String, userId: Number) {
    const connection = await createConnection();

    try {
      const contents = await connection
        .getRepository(Content)
        .createQueryBuilder('contents')
        .leftJoin('contents.subject', 'subjects')
        .where('subjects.id = :subjectId', { subjectId })
        .andWhere('subjects.userId = :userId', { userId })
        .getMany();

      await connection.close();

      return contents
    } catch(err) {
      console.log(err);
      await connection.close();
      return err;
    }
  }

  static async deleteContentById(contentId: number) {
    const connection = await createConnection();

    try {
      await connection
        .getRepository(Content)
        .createQueryBuilder('contents')
        .delete()
        .where('id = :contentId', { contentId })
        .execute();
    
      await connection.close();

      return true;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return err;
    }
  }
}

export default ContentRepository;