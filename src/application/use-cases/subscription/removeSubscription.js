export default async function removeSubscription(userId, pair, subscriptionRepository) {
  return subscriptionRepository.removeSubscription(userId, pair);
};
