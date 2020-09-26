import { NextFunction, Request, Response } from "express";
import JWTUtil from "../../util/JWTUtil";
import ContentRepository from "../repository/ContentRepository";

class ContentOwnerMiddleware {
  static async userIsOwnerOfThisContent(request: Request, response: Response, next: NextFunction) {
    const token = request.headers.authorization as string;
    const user = await JWTUtil.getUser(token);
    const contentId = request.params.contentId;

    const content = await ContentRepository.getContentFromUser(Number(contentId), user.id);

    if(content) {
      return next();
    }
    else {
      return response.status(401).json({err: 'You are not authorized to handle this content'});
    }
  }
}

export default ContentOwnerMiddleware;
