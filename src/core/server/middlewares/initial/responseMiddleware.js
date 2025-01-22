class ResponseMiddleware {
  constructor() {
    this.messages = {
      200: 'Successful.',
      201: 'Created.',
      204: 'No content.',
      400: 'Bad request.',
      401: 'Unauthorized.',
      403: 'Forbidden.',
      404: 'Not found.',
      500: 'Internal server error.',
    };

    this.handle = this.handle.bind(this);
  }

  handle(res) {
    res.customResult = (body, statusCode = res.statusCode, isSuccess) => {
      const success = isSuccess ?? (statusCode < 400);
      const formattedResponse = {
        success,
        data: success ? body : null,
        message: success
          ? 'Successful.'
          : 'An error occurred.',
        error: success
          ? ''
          : (body?.message || this.messages[statusCode] || 'Unknown error'),
      };
      res.statusCode = statusCode ?? 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify(formattedResponse));
    };
  }
}

export const responseMiddleware = new ResponseMiddleware().handle;
