import Crypto from '@core/util/Crypto';

export default class Order {
  constructor({id = Crypto.randomUUID(), pair, type, amount, price}) {
    this.id = id;
    this.pair = pair;
    this.type = type;
    this.amount = amount;
    this.price = price;
  }
}