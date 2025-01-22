import OrderTypes from '@application/enums/OrderTypes';

export default class OrderBook {
  constructor({pair, bids, asks}) {
    this.pair = pair;
    this.bids = bids || [];
    this.asks = asks || [];
  }

  serialize = () => {
    return JSON.stringify({
      bids: this.bids,
      asks: this.asks,
    });
  };

  addOrder = ({type, ...order}) => {
    if (type === OrderTypes.buy) {
      this.bids.push(order);
      this.bids.sort((a, b) => b.price - a.price);
    } else {
      this.asks.push(order);
      this.asks.sort((a, b) => a.price - b.price);
    }
  };

  cancelOrder = (orderId) => {
    const bidsCount = this.bids.length;
    const asksCount = this.asks.length;
    this.bids = this.bids.filter((order) => order.id !== orderId);
    this.asks = this.asks.filter((order) => order.id !== orderId);

    if (bidsCount !== this.bids.count || asksCount !== this.asks.count) {
      return true;
    }

    return false;
  };

  executeTrade = () => {
    const trades = [];

    while (this.bids.length > 0 && this.asks.length > 0) {
      const highestBid = this.bids[0];
      const lowestAsk = this.asks[0];

      if (highestBid.price < lowestAsk.price) {
        break;
      }

      const tradeVolume = Math.min(highestBid.amount, lowestAsk.amount);
      trades.push({
        pair: this.pair,
        amount: tradeVolume,
        sellingPrice: lowestAsk.price,
        buyingPrice: highestBid.price,
        sellOrderId: lowestAsk.id,
        buyOrderId: highestBid.id,
        date: new Date(),
      });

      highestBid.amount -= tradeVolume;
      lowestAsk.amount -= tradeVolume;

      if (highestBid.amount === 0) this.bids.shift();
      if (lowestAsk.amount === 0) this.asks.shift();
    }

    return trades.length > 0 ? trades : null;
  };
}
