import { MySqlUsersRepository } from "../../../../src/gateway/repository/MySqlUsersRepository";
import { User } from "../../../../src/domain/entity/User";
import { ConnectionDB } from "../../../../src/config/ConnectionDB";
import { CreateUserUseCase } from "../../../../src/usecase/CreateUserUseCase";
import { UserController } from "../../../../src/gateway/controller/UserController";
import {Request, Response } from 'express';

describe('create user controller', () => {

  const user: User = new User({
    name: "Douglas",
    email: "dbergami@ciandt.com",
    password: "123"
  });
  const insertId: number = 1;
  let request = {
    body: {
      name: user.name,
      email: user.email,
      password: user.password
    }
  }

  const res: Response = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  it('should return a success message for create a user and status code 201', async () => {
    // Given: I mock the use case execute
    let createUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(insertId)),
    } as unknown as CreateUserUseCase
    let userController: UserController = new UserController(createUserUseCase);
    
    // when: I call the userController to create a user
    await userController.createUser(request, res);  

    // Then: I obtain a success message and status code 201
    expect(res.json).toHaveBeenCalledWith("User created " + insertId);
    expect(res.status).toHaveBeenCalledWith(201);
  })

  it('should return a message error to create a user and status code 500', async () => {
    // Given: I mock the use case execute
    const messageError = {message: "sintaxe sql incorrect"}
    let createUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.reject(messageError)),
    } as unknown as CreateUserUseCase
    let userController: UserController = new UserController(createUserUseCase);
    
    // when: I call the userController to create a user
    await userController.createUser(request, res);  

    // Then: I obtain a success message and status code 500
    expect(res.json).toHaveBeenCalledWith(messageError);
    expect(res.status).toHaveBeenCalledWith(500);
  })

  it('should return a default message error to create a user and status code 500', async () => {
    // Given: I mock the use case execute
    const messageError = {message: 'Unexpected error.'};
    let createUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.reject({message: ""})),
    } as unknown as CreateUserUseCase
    let userController: UserController = new UserController(createUserUseCase);
    
    // when: I call the userController to create a user
    await userController.createUser(request, res);  

    // Then: I obtain a success message and status code 500
    expect(res.json).toHaveBeenCalledWith(messageError);
    expect(res.status).toHaveBeenCalledWith(500);
  })
})