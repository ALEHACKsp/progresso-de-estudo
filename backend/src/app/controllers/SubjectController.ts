import { Request, Response } from "express";
import JWTUtil from "../../util/JWTUtil";
import { Subject } from "../entity/Subject";
import SubjectRepository from "../repository/SubjectRepository";


class SubjectController {
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
}

export default SubjectController;