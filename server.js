const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const mongoose = require('mongoose');
const { getEnv } = require('./src/config');

const app = require('./app');
const PORT = getEnv().PORT ?? 3000;
const MONGO_URI = getEnv().MONGO_URI;

const start = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Database successfully connected');
  } catch (error) {
    console.log('Database error connection');
    process.exit(1);
  }

  app.listen(process.env.PORT, () => {
    console.log(`Server running. Use our API on port: ${process.env.PORT}`);
  });
};

start();
