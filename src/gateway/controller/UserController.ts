import {Request, Response } from 'express';
import { CreateUserUseCase } from "../../usecase/CreateUserUseCase";
import { User } from '../../domain/entity/User';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async createUser(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    try {
    const insertId: number = await this.createUserUseCase.execute(new User({
      name, email, password
    }));

    response.json("User created " + insertId);
    return response.status(201).send();
    } catch (err) {
      return response.status(500).json({ 
        message: err.message || 'Unexpected error.'
      });
     }
  } 
}