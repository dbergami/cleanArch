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

// const query = 'SELECT * FROM livro';


// (() => {
//     Query(query)
//       .then(results => {
//         console.log("resultados", results);
//       })
//       .catch((error) => {
//         console.log("erro ao buscar dados");
//       })
// })()

// (() => {
//   Connect()
//   .then(connection => {
//     console.log("conectou");
//     Query(connection, query)
//       .then(results => {
//         console.log("resultados", results);
//       })
//       .catch((error) => {
//         console.log("erro ao buscar dados");
//       })
//   })
//   .catch(error => {
//     console.log("nao conectou");
//   })
// })()

// (async () => {
//   const db = require("./config/db");
//   console.log("passou");
//   console.log("executando sql");
//   const books = await db.selectedBooks();
//   console.log(books);
//   const insert = await db.insertSuggestBook({title: "xablau", actor:"douglas", message:"blablalba"});
//   console.log("###insert", insert[0].insertId);
// })();


export { createUserUseCase, userControllers}

