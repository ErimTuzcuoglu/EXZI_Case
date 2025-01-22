import Crypto from '@core/util/Crypto';

export default class Order {
  constructor({id = Crypto.randomUUID(), type, amount, price}) {
    this.id = id;
    this.type = type;
    this.amount = amount;
    this.price = price;
  }
}