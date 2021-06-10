import { User } from '../domain/entity/User';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User>;
  save(user: User): Promise<number>;
}