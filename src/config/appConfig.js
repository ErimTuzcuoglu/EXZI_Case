import {config as dotenvConfig} from 'dotenv';
const path = require('path');
dotenvConfig({path: path.resolve(`${__dirname}/../..`, `.env.${process.env.NODE_ENV || 'development'}`)});

export default {
  port: parseInt(process.env.PORT) || 3000,
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: parseInt(process.env.REDIS_PORT) || 6379,
  },
  urlLoggingEnabled: Boolean(process.env.URL_LOGGING_ENABLED) || false,
};
