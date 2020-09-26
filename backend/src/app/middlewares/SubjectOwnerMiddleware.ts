import { NextFunction, Request, Response } from "express";
import JWTUtil from "../../util/JWTUtil";
import { Subject } from "../entity/Subject";
import SubjectRepository from "../repository/SubjectRepository";

class SubjectOwnerMiddleware {
  static async userIsOwnerOfThisSubject(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization as string;
    const user = await JWTUtil.getUser(token);
    const subjectId = request.params.subjectId;

    const subject = await SubjectRepository.getSubjectFromUser(Number(subjectId), user.id);

    if(subject instanceof Subject) {
      return next();
    }
    else {
      return response.status(401).json('You are not authorized to handle this subject');
    }
  }
}

export default SubjectOwnerMiddleware;
