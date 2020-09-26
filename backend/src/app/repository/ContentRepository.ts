import UpdateContent from '../../interfaces/UpdateContent';
import { createConnection } from 'typeorm';
import { Content } from '../entity/Content';
import ContentController from '../controllers/ContentController';

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

  static async getContentFromUser(contentId: Number, userId: Number) {
    const connection = await createConnection();
    
    try {
      const content = await connection
        .getRepository(Content)
        .createQueryBuilder('contents')
        .leftJoin('content.subject', 'subjects')
        .where('content.id = :contentId', { contentId })
        .andWhere('subjects.userId = :userId', { userId })
        .getOne();

      await connection.close();

      return content;
    }
    catch(err) {
      console.log(err);
      await connection.close();
      return null;
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

  static async update(contentId: Number, newData: UpdateContent) {
    try {
      let content: Content = await this.getById(contentId);
      content.name = newData.name || content.name;
      content.check = newData.check || content.check;
      content.anotation = newData.anotation || content.anotation;
      content.totalErros = newData.totalErros || content.totalErros;
      content.totalQuestions = newData.totalQuestions || content.totalQuestions;
      content.totalHits = newData.totalHits || content.totalHits;
      
      const connection = await createConnection();
      await connection.manager.save(content);
      await connection.close();

      return content;
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }
}

export default ContentRepository;