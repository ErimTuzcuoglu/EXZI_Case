// import jwt from 'jsonwebtoken';
// import CustomError from '@application/errors/CustomError';
// import appConfig from '@config/appConfig';

// export default class AuthService {
//   static async verify(token) {
//     try {
//       if (!token) {
//         throw new CustomError(undefined, 401);
//       }
//       const result = await jwt.verify(token, appConfig.jwtSecret);
//       return result;
//     } catch (error) {
//       if (error.message === 'invalid token') {
//         throw new CustomError('Invalid Token', 401);
//       }
//       throw error;
//     }
//   };
// };
