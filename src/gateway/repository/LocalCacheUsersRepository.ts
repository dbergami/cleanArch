import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../domain/entity/User";

export class LocalCacheUsersRepository implements IUsersRepository {

  private users: User[] = [];
  private insertId: number = 0;

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email) || null;
    
    return user;
  }

  async save(user: User): Promise<number> {
    this.insertId ++;
    this.users.push(new User(user, this.insertId));
    return this.insertId;
  }

}