import { config } from 'dotenv';

// I have configured env varibles here so that import statements below them can get it.
config({ path: './.env' });

import connectToDatabase from './db';
import app, { startApp } from './app';

const PORT = Number(process.env.PORT) || 4040;

async function startServer() {
  try {
    // First try to start Database if it starts then start app.listen
    await connectToDatabase();

    startApp();

    app.listen(PORT, () => {
      console.log('\n⚙️  Server is running on port:', PORT);
    });
  } catch (error) {
    console.error('\nFailed to start server:', error);
  }
}

startServer();
