import Logger from '@core/util/Logger';

class ErrorHandlingMiddleware {
  handle = (err, res) => {
    Logger.error(`[${err.status}] [${err.stack}]`);
    res.customResult(err, err.status || 500, false);
  };
}

export default new ErrorHandlingMiddleware().handle;
