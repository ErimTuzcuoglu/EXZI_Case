export default function deleteById(id, userRepository) {
  return userRepository.findById(id).then((user) => {
    if (!user) {
      throw new Error(`No user found with id: ${id}`);
    }
    return userRepository.deleteById(id);
  });
}
