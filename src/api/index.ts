import { config } from 'dotenv';

// I have configured env varibles here so that import statements below them can get it.
config({ path: './.env' });

import connectToDatabaseV2 from './v2/db';
import connectToDatabaseV1 from './v1/db';
import app, { startApp } from './app';
import { apiV1, apiV2 } from './constants';

const PORT = Number(process.env.PORT) || 4040;

async function startServer() {
  try {
    // First try to connect Database and after successfully connected run startApp()
    if (apiV1) {
      await connectToDatabaseV1();
    }
    if (apiV2) {
      await connectToDatabaseV2();
    }

    startApp();

    app.listen(PORT, () => {
      console.log('\n⚙️  Server is running on port:', PORT);
    });
  } catch (error) {
    console.error('\nFailed to start server:', error);
  }
}

startServer();
