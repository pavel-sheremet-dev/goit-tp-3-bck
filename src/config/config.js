const getEnv = () => ({
  PORT: process.env.PORT,
  CORS: process.env.CORS,
  MONGO_URI: process.env.MONGO_URI,
  ROUNDS: process.env.ROUNDS,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  JWT_SECRET: process.env.JWT_SECRET,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  SENDGRID_SENDER: process.env.SENDGRID_SENDER,
  SERVER_BASE_URL: process.env.SERVER_BASE_URL,
});

exports.config = { getEnv };
