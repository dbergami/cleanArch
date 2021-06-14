import { MySqlUsersRepository } from "./gateway/repository/MySqlUsersRepository";
import { LocalCacheUsersRepository } from "./gateway/repository/LocalCacheUsersRepository";
import { CreateUserUseCase } from "./usecase/CreateUserUseCase";
import { UserController } from "./gateway/controller/UserController";
import { ConnectionDB } from "./config/ConnectionDB";

const connectionDB = new ConnectionDB();
const mySqlUsersRepository = new MySqlUsersRepository(connectionDB);
const localCacheUsersRepository = new LocalCacheUsersRepository();
const createUserUseCase = new CreateUserUseCase(mySqlUsersRepository);
const userControllers = new UserController(createUserUseCase);

export { createUserUseCase, userControllers}

