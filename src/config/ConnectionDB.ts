import mysql from 'mysql'

export class ConnectionDB {
  private MYSQL_HOST = process.env.MYSQL_HOST || 'localhost';
  private MYSQL_USER = process.env.MYSQL_USER || 'admin';
  private MYSQL_PASSWORD = process.env.MYSQL_PASSWORD || 's123';
  private MYSQL_DATABASE = process.env.MYSQL_DATABASE || 'books_test';
  private MYSQL_PORT = process.env.MYSQL_PORT || 3305;

  private params = {
      host     : this.MYSQL_HOST,
      user     : this.MYSQL_USER,
      password : this.MYSQL_PASSWORD,
      database : this.MYSQL_DATABASE,
      port     : this.MYSQL_PORT
  }

  private pool = mysql.createPool(this.params);

  query = async (query: string, values?: any[]) => new Promise((resolve, reject) => {

    this.pool.getConnection((err, connection) => {
      if(err) throw err

      connection.query(query, values, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
    
        connection.release();
      })

    })
  })
}