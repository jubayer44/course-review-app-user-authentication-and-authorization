/* eslint-disable no-console */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
const PORT = config.port || 5000;

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log('Connected to Database');

    server = app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('unhandledRejection');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('uncaughtException');
  process.exit(1);
});
