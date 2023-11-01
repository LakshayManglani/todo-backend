import { Sequelize } from 'sequelize';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE_V2 } =
  process.env;

// Config related to database
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE_V2,
  host: MYSQL_HOST,
  logging: false,
});

// Function to authenticate database connection
async function connectToDatabase(): Promise<void> {
  try {
    // So that every table can be created if doesn't exists
    await sequelize.sync();

    console.log(`\n📤 ${MYSQL_DATABASE_V2} Database connected`);
  } catch (error: any) {
    console.error(
      `\nFailed to connect to the ${MYSQL_DATABASE_V2} database:`,
      error
    );

    // Terminate Nodejs so that the execution stops
    process.exit(1);
  }
}

export { sequelize };
export default connectToDatabase;
