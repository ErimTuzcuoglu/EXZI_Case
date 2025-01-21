import CustomError from '@application/errors/CustomError';

class NotFoundMiddleware {
  handle = (req, res, next) => {
    throw new CustomError(`Not Found - ${req.originalUrl}`, 404);
  };
}

export default new NotFoundMiddleware().handle;
