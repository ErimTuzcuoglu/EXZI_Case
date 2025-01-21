// import AuthService from '@core/services/AuthService';

// class AuthenticateTokenMiddleware {
//   async handle(req, res, next) {
//     try {
//       const token = req.headers['authorization']?.split('Bearer ')[1];
//       await AuthService.verify(token);
//       return next();
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// export default new AuthenticateTokenMiddleware().handle;
