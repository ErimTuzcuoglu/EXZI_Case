// import CryptService from '@core/services/CryptService';

export default async function updateById(userDTO) {
  const {
    id,
    name,
    email,
    password,
    userRepository,
  } = userDTO;

  if (!id || !name || !email || !password) {
    throw new Error('Some fields are empty or not found!');
  }

  const user = await userRepository.findBy({email});
  if (!user || user.length === 0) {
    throw new CustomError('User not found', 400);
  }

  // const hashedPassword = await CryptService.hash(password);

  const updatedUser = {name, email /* hashedPassword */};

  return userRepository.updateById(id, updatedUser);
}
