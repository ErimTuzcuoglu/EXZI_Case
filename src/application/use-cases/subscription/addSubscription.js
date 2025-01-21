export default async function addSubscription(userId, pair, subscriptionRepository) {
  return subscriptionRepository.addSubscription(userId, pair);
};
