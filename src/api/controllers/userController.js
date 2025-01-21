import {user as userCases} from '@application/use-cases';

export default function userController(
  // userRepository,
  // userModelRepository,
) {
  // const dbRepository = userRepository(userModelRepository());

  const fetchAllUsers = async (req, res, next) => {
    try {
      // const users = await userCases.getAll(dbRepository);
      // return res.customResult(users);
    } catch (error) {
      return next(error);
    }
  };

  const fetchUserById = async (req, res, next) => {
    try {
      const user = await userCases.findById(req.params.id, dbRepository);
      return res.customResult(user, user ? 200 : 404, !!user);
    } catch (error) {
      return next(error);
    }

  };

  const addNewUser = async (req, res, next) => {
    const {name, email, password} = req.body;

    try {
      // const createdUser = await userCases.signUp({name, email, password, userRepository: dbRepository});
      // res.status(201);
      // return res.customResult(createdUser);
    } catch (error) {
      return next(error);
    }
  };

  const deleteUserById = async (req, res, next) => {
    try {
      // await userCases.deleteById(req.params.id, dbRepository);
      // return res.customResult('User Deleted Succesfully');
    } catch (error) {
      return next(error);
    }

  };

  const updateUserById = async (req, res, next) => {
    const {name, email, password} = req.body;

    try {
      // const updatedUser = await userCases.updateById({
      //   id: req.params.id,
      //   name,
      //   email,
      //   password,
      //   userRepository: dbRepository,
      // });
      // return res.customResult(updatedUser);
    } catch (error) {
      return next(error);
    }
  };

  const logout = async (req, res, next) => {
    const {id} = req.query;

    try {
      // const logoutResponse = await userCases.logout({id, userRepository: dbRepository});
      // res.status(201);
      // return res.customResult(logoutResponse);
    } catch (error) {
      return next(error);
    }
  };

  return {
    fetchAllUsers,
    fetchUserById,
    addNewUser,
    updateUserById,
    deleteUserById,
    logout,
  };
}
