import {config as dotenvConfig} from 'dotenv';
const path = require('path');
dotenvConfig({path: path.resolve(`${__dirname}/../..`, `.env.${process.env.NODE_ENV || 'development'}`)});

export default {
  port: parseInt(process.env.PORT) || 3000,
  socketPort: parseInt(process.env.SOCKET_PORT) || 8080,
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
  jwtSecret: process.env.JWT_SECRET,
  swaggerDocsEnabled: Boolean(process.env.SWAGGER_DOCS_ENABLED),
  urlLoggingEnabled: Boolean(process.env.URL_LOGGING_ENABLED) || false,
};
