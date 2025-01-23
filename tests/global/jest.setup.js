import Redis from 'ioredis-mock';
import OrderBookRepository from '@core/database/redis/repositories/OrderBookRepository';
import OrderBookService from '@application/services/OrderBookService';

jest.mock('ioredis', () => jest.requireActual('ioredis-mock'));

let orderBookService;
let redisClient;
let redisSubscribeClient;
let mockLogger = {
  info: jest.fn(),
  error: jest.fn(),
};

beforeAll(async () => {
  redisClient = new Redis();
  redisSubscribeClient = new Redis();

  const orderBookRepository = new OrderBookRepository({
    logger: mockLogger,
    redisClient,
    redisSubscribeClient,
  });
  orderBookService = new OrderBookService(orderBookRepository);
});

beforeEach(() => {
  redisClient.flushall();
});

afterAll(async () => {
  await redisClient.quit();
  await redisSubscribeClient.quit();
});

export {orderBookService};
