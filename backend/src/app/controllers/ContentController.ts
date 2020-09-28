import { Request, Response } from "express";
import { Content } from "../entity/Content";
import JWTUtil from "../../util/JWTUtil"; 
import SubjectRepository from '../repository/SubjectRepository';
import ContentRepository from "../repository/ContentRepository";

class ContentController {
  static async index(request: Request, response: Response) {
    const token = request.headers.authorization;
    const subjectId = request.params.subjectId as string;
    const user = await JWTUtil.getUser(token);

    const contents = await ContentRepository.getAll(subjectId, user.id);

    if (Array.isArray(contents)) {
      return response.status(200).json(contents);
    }

    return response.status(200).json(contents);
  }

  static async store(request: Request, response: Response) {
    const subjectId = request.params.subjectId;

    const content = new Content();
    content.name = request.body.name;
    content.check = request.body.check;
    content.anotation = request.body.anotation;
    content.totalQuestions = request.body.totalQuestions;
    content.totalHits = request.body.totalHits;
    content.totalErros = request.body.totalErros;
    content.subject = await SubjectRepository.getSubject(Number(subjectId));

    const result = await ContentRepository.create(content);
    
    if (typeof result === 'boolean' && result) {
      return response.status(201).json();
    }

    return response.status(500).json();
  }

  static async get(request: Request, response: Response) {
    const contentId = request.params.contentId;

    const content = await ContentRepository.getById(Number(contentId));

    if (content instanceof Content) {
      return response.status(200).json(content);
    }

    return response.status(404).json({ err: 'content was not found.' });
  }

  static async update(request: Request, response: Response) {
    const contentId = request.params.contentId;
    
    const result = await ContentRepository.update(Number(contentId), { 
      name: request.body.name,
      check: request.body.check,
      anotation: request.body.anotation,
      totalErros: request.body.totalErros,
      totalHits: request.body.totalHits,
      totalQuestions: request.body.totalQuestions
     });

    if (result) {
      return response.status(200).json(result);
    }

    return response.status(500).json({ err: 'We were unable to update this content.' });
  }

  static async delete(request: Request, response: Response) {
    const contentId = request.params.contentId as string;

    const result = await ContentRepository.deleteContentById(Number(contentId));

    if (typeof result === 'boolean' && result) {
      return response.status(200).json();
    } 

    return response.status(500).json();
  }
}

export default ContentController;
