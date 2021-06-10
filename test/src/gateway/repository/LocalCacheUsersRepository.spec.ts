import { LocalCacheUsersRepository } from "../../../../src/gateway/repository/LocalCacheUsersRepository";
import { User } from "../../../../src/domain/entity/User";

describe('repository user', () => {

  let localCacheUsersRepository: LocalCacheUsersRepository = new LocalCacheUsersRepository();
  const user: User = new User({
    name: "Douglas",
    email: "dbergami@ciandt.com",
    password: "123"
  })

  beforeEach(() => {
    localCacheUsersRepository = new LocalCacheUsersRepository();
  });

  it('should insert a new user and return your id number', async () => {
    // when: I call the localCacheUsersRepository to save user
    const result = await localCacheUsersRepository.save(user);  

    // Then: I obtain the id 1 insert
    expect(result).toEqual(1);
  })

  it('should find a user by email', async () => {
    // given: I mock the user in cache
    await localCacheUsersRepository.save(user); 
    const userFound = new User(user, 1);

    // when: I call the localCacheUsersRepository to save user
    const result = await localCacheUsersRepository.findByEmail(user.email);  

    // Then: I obtain a user
    expect(result).toEqual(userFound);
  })

  it('should not find a user by email', async () => {
    // when: I call the localCacheUsersRepository to save user
    const result = await localCacheUsersRepository.findByEmail(user.email);  

    // Then: I not obtain a user
    expect(result).toEqual(null);
  })
})