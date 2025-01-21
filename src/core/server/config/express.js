import {responseMiddleware} from '../middlewares/initial/responseMiddleware';
import Logger from '@core/services/Logger';

class ExpressConfig {
  constructor(app, config) {
    this.app = app;
    this.config = config;
    this.initializeMiddlewares();
    this.setupGracefulShutdown();
  }

  initializeMiddlewares() {
    this.app.use((req, res, next) => {
      // Website you wish to allow to connect
      // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
      // Request methods you wish to allow
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      );
      // Request headers you wish to allow
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With, Content-type, Userization, Cache-control, Pragma',
      );
      // Pass to next layer of middleware
      next();
    });

    this.app.use(responseMiddleware);
  }

  setupGracefulShutdown() {
    // Added for graceful shutdown
    process.on('SIGTERM', () => {
      Logger.log('SIGTERM signal received.');
      Logger.log('Express app closed.');
      process.exit(0);
    });
  }
}

export default ExpressConfig;
