import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../domain/entity/User";
import { ConnectionDB } from "../../config/ConnectionDB";

export class MySqlUsersRepository implements IUsersRepository {
  constructor(
    private connectionDB: ConnectionDB,
  ) {}

  private FIND_BY_EMAIL: string = 'SELECT * FROM user where email = ?';
  private INSERT_USER: string = 'INSERT INTO user (id, name, email, password) VALUES (?, ?, ?, ?)';

  async findByEmail(email: string): Promise<User> {
    var user: User = null;
    await this.connectionDB.query(this.FIND_BY_EMAIL, [email])
    .then((results: [any]) => {
      if (results.length > 0) {
        const {id, name, email, password} = results[0];
        user = new User({name, email, password}, id);
      }
    })
    .catch((error) => {
      throw new Error("Error to find data: " +  error.message);
    })
    
    return user;
  }

  async save(user: User): Promise<number> {
    var insertID: number;
    await this.connectionDB.query(this.INSERT_USER, [user.id, user.name, user.email, user.password])
    .then(result => {
      insertID = result['insertId'];
    })
    .catch((error) => {
      console.log("Error to save data", error.message);
    })

    return insertID;
  }

}