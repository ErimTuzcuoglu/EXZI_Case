import CustomError from '@application/errors/CustomError';
// import CryptService from '@core/services/CryptService';

export default async function signUp(userDTO) {
  const {
    name,
    email,
    password,
    userRepository,
  } = userDTO;
  if (!name || !email || !password) {
    throw new Error('Some fields are empty or not found!');
  }

  const user = await userRepository.findBy({email});
  if (user && user.length > 0) {
    throw new CustomError('Email already exists', 400);
  }

  // const hashedPassword = await CryptService.hash(password);

  const newUser = {
    name,
    email,
    // hashedPassword,
  };

  return userRepository.signUp(newUser);
}
