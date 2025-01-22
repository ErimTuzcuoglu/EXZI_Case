import CustomError from '@application/errors/CustomError';

class NotFoundMiddleware {
  handle = (req) => {
    throw new CustomError(`Not Found - ${req.url}`, 404);
  };
}

export default new NotFoundMiddleware().handle;
