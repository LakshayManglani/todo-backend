import { config } from 'dotenv';

// I have configured env varibles here so that import statements below them can get it.
config({ path: './.env' });

import express from 'express';
import startServerV1 from './v1';
import startServerV2 from './v2';

const PORT = Number(process.env.PORT) || 4040;

const app = express();

async function startAllServer() {
  try {
    await startServerV1(app);
    await startServerV2(app);
    app.listen(PORT, () => {
      console.log('\n⚙️  All Servers are running on port:', PORT);
    });
  } catch (error) {
    console.log('Failed to start all server: ', error);
  }
}

if (process.env.ENVIRONMENT === 'development') {
  startAllServer();
}
