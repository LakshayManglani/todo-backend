import mysql from 'mysql';

// By exporting it now outer files can also query
export let mysqlConnection: mysql.Connection;

// Connect to mysql by using this function
function connectMysql(): Promise<mysql.Connection> {
  const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } =
    process.env;

  mysqlConnection = mysql.createConnection({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE,
  });

  return new Promise((resolve, reject) => {
    mysqlConnection.connect(function (err) {
      if (err) {
        reject(err);
      }

      console.log('📤 connected as id', mysqlConnection.threadId);
      resolve(mysqlConnection);
    });
  });
}

export default connectMysql;
