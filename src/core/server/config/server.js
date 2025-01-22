import Logger from '@core/util/Logger';
import Router from '@core/server/routes/index';
/* #region  Middlewares */
import loggingMiddleware from '@core/server/middlewares/initial/loggingMiddleware';
import {responseMiddleware} from '../middlewares/initial/responseMiddleware';
import errorHandlingMiddleware from '@core/server/middlewares/initial/errorHandlingMiddleware';
/* #endregion */

class ServerConfig {
  constructor({req, res, config}) {
    this.req = req;
    this.res = res;
    this.config = config;
    try {
      this.setupGracefulShutdown();
      this.initializeMiddlewares();
    } catch (err) {
      errorHandlingMiddleware(err, res);
    }
  }

  setupGracefulShutdown() {
    // Added for graceful shutdown
    process.on('SIGTERM', () => {
      Logger.log('SIGTERM signal received.');
      Logger.log('Node app closed.');
      process.exit(0);
    });
  }

  initializeMiddlewares() {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    this.res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    );
    // Request headers you wish to allow
    this.res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Userization, Cache-control, Pragma',
    );

    responseMiddleware(this.res);
    if (this.config.urlLoggingEnabled) {
      loggingMiddleware(this.req);
    }
    (new Router(this.req, this.res));
  }
}

export default ServerConfig;
