import Logger from '@core/services/Logger';

class ErrorHandlingMiddleware {
  handle = (err, req, res) => {
    Logger.error(`[${err.status}] [${err.stack}]`);
    res.customResult(err, err.status || 500, false);
  };
}

export default new ErrorHandlingMiddleware().handle;
