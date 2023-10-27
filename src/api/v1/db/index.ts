import { Sequelize } from 'sequelize';

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;

// Config related to database
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  host: MYSQL_HOST,
  // logging: false,
});

// Function to authenticate database connection
async function connectToDatabase(): Promise<void> {
  try {
    // So that every table can be created if doesn't exists
    await sequelize.sync();

    console.log('\n📤 Database connected');
  } catch (error: any) {
    console.error('\nFailed to connect to the database:', error);

    // Terminate Nodejs so that the execution stops
    process.exit(1);
  }
}

export { sequelize };
export default connectToDatabase;
