import { Request, Response } from "express";
import JWTUtil from "../../util/JWTUtil";
import { Subject } from "../entity/Subject";
import SubjectRepository from "../repository/SubjectRepository";

class SubjectController {
  static async index(request: Request, response: Response) {
    const token: string = request.headers.authorization;

    const user = await JWTUtil.getUser(token);
    const subjects = await SubjectRepository.getAllFromUser(user.id);

    if (subjects instanceof Array) {
      return response.status(200).json(subjects);
    }

    return response.status(500).json();
  }
  
  static async store(request: Request, response: Response) {
    const token: string = request.headers.authorization;
    const { name }: { name: string } = request.body;

    const user = await JWTUtil.getUser(token);
    const subject = new Subject;
    subject.name = name;
    subject.user = user;

    const result = await SubjectRepository.create(subject);

    if (typeof result === 'boolean') {
      return response.status(201).json();
    }

    return response.status(500).json({ err: 'Could not create subject.' })
  };

  static async delete(request: Request, response: Response) {
    const token: string = request.headers.authorization;
    const user = await JWTUtil.getUser(token);
    const subjectId = request.params.subjectId;
    
    const subject = await SubjectRepository.getSubject(Number.parseInt(subjectId));

    if (subject instanceof Subject && await SubjectRepository.delete(subject)) {
      return response.status(200).json();
    }

    return response.status(500).json({ err: 'Was not possible delete this subject.' });
  }
}

export default SubjectController;