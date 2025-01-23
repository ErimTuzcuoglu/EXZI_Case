import {orderBookService} from './global/jest.setup';
import Order from '@application/dtos/Order';
import OrderTypes from '@application/enums/OrderTypes';

describe('OrderBook Tests', () => {
  const buyOrder = new Order({type: OrderTypes.buy, price: 20000, amount: 5});
  const sellOrder = new Order({type: OrderTypes.sell, price: 50000, amount: 1});

  test('Add buy and sell order', async () => {
    await orderBookService.addOrder('BTC-USD', buyOrder);
    const orderBook = await orderBookService.addOrder('BTC-USD', sellOrder);

    expect(orderBook.bids).toHaveLength(1);
    expect(orderBook.asks).toHaveLength(1);
    expect(orderBook.bids[0].price).toBe(buyOrder.price);
    expect(orderBook.bids[0].amount).toBe(buyOrder.amount);
    expect(orderBook.asks[0].price).toBe(sellOrder.price);
    expect(orderBook.asks[0].amount).toBe(sellOrder.amount);
  });

  test('Cancel order', async () => {
    let orderBook = await orderBookService.addOrder('BTC-USD', buyOrder);
    expect(orderBook.bids).toHaveLength(1);

    await orderBookService.cancelOrder('BTC-USD', orderBook.bids[0].id);
    orderBook = await orderBookService.getOrderBook('BTC-USD');
    expect(orderBook.bids).toHaveLength(0);
  });

  test('Execute trade', async () => {
    let orderBook = await orderBookService.addOrder('BTC-USD', buyOrder);
    orderBook = await orderBookService.addOrder('BTC-USD', sellOrder);
    const trades = await orderBook.executeTrade();

    expect(trades).toBeNull();
    expect(orderBook.bids).toHaveLength(1);
    expect(orderBook.asks).toHaveLength(1);

    orderBook = await orderBookService.addOrder('BTC-USD', {...buyOrder, type: OrderTypes.sell});
    orderBook = await orderBookService.addOrder('BTC-USD', {...sellOrder, type: OrderTypes.buy});

    const trades2 = await orderBook.executeTrade();

    expect(trades2).toBeNull();
    expect(orderBook.bids).toHaveLength(0);
    expect(orderBook.asks).toHaveLength(0);
  });
});