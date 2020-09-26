import { User } from '../entity/User';
import { Request, Response } from "express";
import UserRepository from '../repository/UserRepository';
import JWTUtil from '../../util/JWTUtil';

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

  static async get(request: Request, response: Response) {
    const token: string = request.headers.authorization; 

    const user = await JWTUtil.getUser(token);

    if (user) {
      const userDataToSend = {
        name: user.name,
        email: user.email,
      }
  
      return response.status(200).json({ user: userDataToSend });
    }
    
    return response.status(404).json({ err: 'User was not found.' });
  }

  static async delete(request: Request, response: Response) {
    const token: string = request.headers.authorization; 

    const user = await JWTUtil.getUser(token);

    if (user) {
      const result = await UserRepository.deleteUserById(user.id);

      if (result) {
        return response.status(200).json();
      }
  
      return response.status(500).json();
    }
    
    return response.status(404).json({ err: 'User was not found.' });
  }
}

export default UserController;
