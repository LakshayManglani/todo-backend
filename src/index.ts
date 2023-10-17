import { config } from 'dotenv';

// FIXME: Can we shift this config statement after all import statement without breaking .env access to all file.
config({ path: './.env' });

import connectMysql from './db/index';
import app from './app';

const PORT = Number(process.env.PORT) || 4040;

async function startServer() {
  try {
    await connectMysql();
    app.listen(PORT, () => {
      console.log('⚙️  Server is running on port:', PORT);
    });
  } catch (error) {
    console.error('error connecting to mysql:', error);
    process.exit(1);
  }
}

startServer();
