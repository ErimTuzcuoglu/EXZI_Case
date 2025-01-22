import Order from '@application/dtos/Order';
import OrderBook from '../entities/OrderBook';
import OrderEvents from '@application/enums/OrderEvents';

export default class OrderBookRepository {
  constructor({
    redisClient,
    redisSubscribeClient,
    logger,
  }) {
    this.redisClient = redisClient;
    this.redisSubscribeClient = redisSubscribeClient;
    this.logger = logger;
  }

  subscribePairChanges = async (pair, callback) => {
    await this.redisSubscribeClient.subscribe(`orderbook::${pair}`, (message) => {
      callback(message);
    });
  };

  addOrder = async (pair, incomingOrder) => {
    const {amount, price, type} = incomingOrder;
    const order = new Order({amount, price, type});
    const orderBook = await this.getOrderBook(pair);
    orderBook.addOrder(order);

    const trades = orderBook.executeTrade();

    await this.redisClient.set(`orderbook::${pair}`, orderBook.serialize());

    await this.redisClient.publish(`orderbook::${pair}`, {
      type: OrderEvents.add_order,
      order: order,
      trades,
    });
    return this.getOrderBook(pair);
  };

  getOrderBook = async (pair) => {
    const orderbooks = await this.redisClient.get(`orderbook::${pair}`);
    const parsed = JSON.parse(orderbooks);
    return (new OrderBook({pair, ...parsed}));
  };

  cancelOrder = async (pair, orderId) => {
    const orderBook = await this.getOrderBook(pair);
    const isOrderCancelled = orderBook.cancelOrder(orderId);
    if (!isOrderCancelled) {
      this.logger.info(`Order with id ${orderId} not found`);
      return false;
    }

    this.redisClient.set(`orderbook::${pair}`, orderBook.serialize());

    await this.redisClient.publish(`orderbook::${pair}`, {
      type: OrderEvents.cancel_order,
      orderId,
    });
    return true;
  };
}
