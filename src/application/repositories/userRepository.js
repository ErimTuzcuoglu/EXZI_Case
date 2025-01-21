export default function userRepository(repository) {
  const getAll = () => repository.getAll();
  const findById = (id) => repository.findById(id);
  const findBy = (fields) => repository.findBy(fields);
  const signUp = (user) => repository.signUp(user);
  const updateById = (id, user) => repository.updateById(id, user);
  const deleteById = (id) => repository.deleteById(id);

  return {
    getAll,
    findById,
    findBy,
    signUp,
    updateById,
    deleteById,
  };
}
