import { config } from 'dotenv';

if (process.env.ENVIRONMENT === undefined) {
  config({ path: './.env' });
}

import connectToDatabase from './db';
import app, { startApp } from './app';

const PORT = Number(process.env.PORT) || 4040;

async function startServer(app: any) {
  try {
    // First try to connect Database and after successfully connected run startApp()
    await connectToDatabase();

    startApp(app);

    if (process.env.ENVIRONMENT === 'production') {
      app.listen(PORT, () => {
        console.log('\n⚙️  Server is running on port:', PORT);
      });
    }
  } catch (error) {
    console.error('\nFailed to start server:', error);
  }
}

if (process.env.ENVIRONMENT === 'production') {
  startServer(app);
}

export default startServer;
