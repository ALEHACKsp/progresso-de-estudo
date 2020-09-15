import { User } from '../entity/User';
import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository';

class UserController {
  static async store(request: Request, response: Response) {
    const { name, email, password }
      : { name: String, email: String, password: String } = request.body;

    const userToSave = new User();
    userToSave.name = name;
    userToSave.email = email;
    userToSave.password = password;

    const result = await UserRepository.create(userToSave);

    if (typeof result === 'boolean') {
      return response.status(201).json();
    }
    
    return response.status(500).json({ err: result });
  }
}

export default UserController;
