import { MySqlUsersRepository } from "../../../../src/gateway/repository/MySqlUsersRepository";
import { User } from "../../../../src/domain/entity/User";
import { ConnectionDB } from "../../../../src/config/ConnectionDB";

describe('repository user', () => {

  const user: User = new User({
    name: "Douglas",
    email: "dbergami@ciandt.com",
    password: "123"
  }, 1);

  it('should insert a new user and return your id number', async () => {
    // Given: I mock the connectionDB query
    let connectionDB = {
      query: jest.fn().mockReturnValue(Promise.resolve({insertId: 1}))
    } as unknown as ConnectionDB;
    let mySqlUsersRepository: MySqlUsersRepository = new MySqlUsersRepository(connectionDB);

    // when: I call the mySqlUsersRepository to save user
    const result = await mySqlUsersRepository.save(user);  

    // Then: I obtain the id 1 insert
    expect(result).toEqual(1);
  })

  it('should find a user by email', async () => {
  // Given: I mock the connectionDB query
  let connectionDB = {
    query: jest.fn().mockReturnValue(Promise.resolve([new User(user, 1)]))
  } as unknown as ConnectionDB;
  let mySqlUsersRepository: MySqlUsersRepository = new MySqlUsersRepository(connectionDB);

  // when: I call the mySqlUsersRepository to save user
  const result = await mySqlUsersRepository.findByEmail(user.email);
  
  // Then: I obtain a user
  expect(result).toEqual(user);
  });

  it('should not find a user by email', async () => {

    // Given: I mock the connectionDB query
    let connectionDB = {
      query: jest.fn().mockReturnValue(Promise.resolve([]))
    } as unknown as ConnectionDB;
    let mySqlUsersRepository: MySqlUsersRepository = new MySqlUsersRepository(connectionDB);

    // when: I call the mySqlUsersRepository to save user
    await mySqlUsersRepository.findByEmail(user.email).then(result => {

     // Then: I not obtain a user
     expect(result).toEqual(null);
   });  
  });

  it('should obtain a error to find email', async () => {
    // Given: I mock the connectionDB query
    let errorMessage = "sql sintaxe incorret";
    let connectionDB = {
      query: jest.fn().mockReturnValue(Promise.reject({message: errorMessage}))
    } as unknown as ConnectionDB;
    let mySqlUsersRepository: MySqlUsersRepository = new MySqlUsersRepository(connectionDB);
  
    try {
      // when: I call the mySqlUsersRepository to save user
      await mySqlUsersRepository.findByEmail(user.email);
    } catch(error) {
      // Then: I obtain a user
      expect(error.message).toEqual("Error to find data: " + errorMessage);
    }

    });

    it('should obtain a error expection: sql invalid', async () => {
      // Given: I mock the connectionDB query
      const messageError = "incorrect sql";
      const sqlInsert = "INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)";
      let connectionDB = {
        query: jest.fn().mockReturnValue(Promise.reject({message: messageError}))
      } as unknown as ConnectionDB;
      let mySqlUsersRepository: MySqlUsersRepository = new MySqlUsersRepository(connectionDB);
  
      try {
        // when: I call the mySqlUsersRepository to save user
        const result = await mySqlUsersRepository.save(user);  
      } catch(error) {
        // Then: i obtain an error
        expect(error.message).toEqual("Error to save data: " + messageError);
        expect(connectionDB.query).toHaveBeenCalledWith(sqlInsert, [user.id, user.name, user.email, user.password]);
      }
    })
})