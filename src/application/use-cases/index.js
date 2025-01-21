/* #region  User */
import signUp from './user/signUp';
import deleteById from './user/deleteById';
import getAll from './user/getAll';
import findById from './user/findById';
import updateById from './user/updateById';
import logout from './user/logout';
/* #endregion */
/* #region  Subscription */
import getSubscriptions from './subscription/getSubscriptions';
import addSubscription from './subscription/addSubscription';
import removeSubscription from './subscription/removeSubscription';
/* #endregion */
const user = {
  signUp,
  deleteById,
  getAll,
  findById,
  updateById,
  logout,
};

const subscriptions = {
  getSubscriptions,
  addSubscription,
  removeSubscription,
};

export {
  user,
  subscriptions,
};