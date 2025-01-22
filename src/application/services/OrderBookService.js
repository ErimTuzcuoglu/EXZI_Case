export default class OrderBookService {
  constructor(repository) {
    this.repository = repository;
  }

  addOrder = async (pair, order) => {
    return this.repository.addOrder(pair, order);
  };

  cancelOrder = async (orderId) => {
    return this.repository.cancelOrder(orderId);
  };

  getOrderBook = async (pair) => {
    return this.repository.getOrderBook(pair);
  };

  subscribePairChanges = async (pair, callback) => {
    return this.repository.subscribePairChanges(pair, callback);
  };
}