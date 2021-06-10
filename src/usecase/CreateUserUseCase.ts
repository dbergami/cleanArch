import { IUsersRepository } from "../gateway/IUsersRepository";
import { User } from "../domain/entity/User";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository
  ) {}

  async execute(user: User): Promise<number> {
    const userAlreadyExists = await this.usersRepository.findByEmail(user.email);

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    }

    const insertId = await this.usersRepository.save(user);
    return insertId;
  }
}