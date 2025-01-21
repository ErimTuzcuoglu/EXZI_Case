export default function logout(id, userRepository) {
  return userRepository.findById(id).then((user) => {
    if (!user) {
      throw new Error(`No user found with id: ${id}`);
    }
    return 'Successfull Logout';
  });
}
