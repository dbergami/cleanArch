import { MySqlUsersRepository } from "../../../src/gateway/repository/MySqlUsersRepository";
import { User } from "../../../src/domain/entity/User";
import { ConnectionDB } from "../../../src/config/ConnectionDB";
import { CreateUserUseCase } from "../../../src/usecase/CreateUserUseCase";

describe('create user use case', () => {

  const user: User = new User({
    name: "Douglas",
    email: "dbergami@ciandt.com",
    password: "123"
  });
  const insertId: number = 1;

  it('should create and return id user when not find email', async () => {
    // Given: I mock the findByEmail and save from mySqlUsersRepository
    let mySqlUsersRepository = {
      findByEmail: jest.fn().mockReturnValue(Promise.resolve(null)),
      save: jest.fn().mockReturnValue(Promise.resolve(insertId)),
    } as unknown as MySqlUsersRepository
    let createUserUseCase: CreateUserUseCase = new CreateUserUseCase(mySqlUsersRepository);
    
    // when: I call the createUserUseCase to create a user
    const result = await createUserUseCase.execute(user);  

    // Then: I obtain the id 1 insert
    expect(result).toEqual(1);
  })

  it('should obtain a error to create user when found email', async () => {
    // Given: I mock the findByEmail
    const errorMessage =  "User already exists.";
    let mySqlUsersRepository = {
      findByEmail: jest.fn().mockReturnValue(Promise.resolve(new User(user, insertId)),
    )} as unknown as MySqlUsersRepository
    let createUserUseCase: CreateUserUseCase = new CreateUserUseCase(mySqlUsersRepository);
    
    // when: I call the createUserUseCase to create a user
    try{
      await createUserUseCase.execute(user);  
    } catch(error) {
      // Then: I obtain a error that already exists the user
      expect(error.message).toEqual(errorMessage);
    }
  })
})