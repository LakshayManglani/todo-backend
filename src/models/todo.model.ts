import { mysqlConnection } from '../db';

function getDatabases() {
  return new Promise((resolve, reject) => {
    mysqlConnection.query('SHOW DATABASES', (error, results, fields) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

export { getDatabases };
