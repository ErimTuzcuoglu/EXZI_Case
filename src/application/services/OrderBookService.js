export default class OrderBookService {
  constructor(repository) {
    this.repository = repository;
  }

  addOrder = async (pair, order) => {
    return this.repository.addOrder(pair, order);
  };

  cancelOrder = async (pair, orderId) => {
    return this.repository.cancelOrder(pair, orderId);
  };

  getOrderBook = async (pair) => {
    return this.repository.getOrderBook(pair);
  };

  subscribePairChanges = async (pair, callback) => {
    return this.repository.subscribePairChanges(pair, callback);
  };
}