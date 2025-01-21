export default function subscriptionRepository(repository) {
  const addSubscription = (userId, pair) => repository.addSubscription(userId, pair);
  const getSubscriptions = (userId) => repository.getSubscriptions(userId);
  const removeSubscription = (userId, pair) => repository.removeSubscription(userId, pair);

  return {
    addSubscription,
    getSubscriptions,
    removeSubscription,
  };
}
