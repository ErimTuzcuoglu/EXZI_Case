import pairOrdersMockData from './mock-data/PairOrders';

export default class Seeder {
  constructor({
    redis,
    logger,
  }) {
    this.redis = redis;
    this.logger = logger;
  }

  async seedBidsAndAsks() {
    for (const {pair, bids, asks} of pairOrdersMockData) {
      await this.redis.set(`orderbook::${pair}`, JSON.stringify({bids, asks}));
    }

    this.logger.info('Crypto Pair Seed Successful');
  }
}
