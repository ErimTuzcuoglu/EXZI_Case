import {createServer} from 'http';
import {afterAll, beforeAll, beforeEach, jest, test} from '@jest/globals';
import WebSocketService from '@core/socket/WebSocketService';

jest.mock('../src/core/database/redis/mock-data/PairOrders', () => [
  {pair: 'BTC-USD'},
  {pair: 'ETH-USD'},
]);

describe('WebSocketService', () => {
  const redisSubscriptions = {};
  let httpServer, webSocketService, ioClient, mockLogger, mockOrderBookService;

  beforeAll((done) => {
    httpServer = createServer();
    mockLogger = {
      info: jest.fn(),
      error: jest.fn(),
    };
    mockOrderBookService = {
      addOrder: jest.fn(),
      cancelOrder: jest.fn(),
      subscribePairChanges: jest.fn((pair, callback) => {
        redisSubscriptions[pair] = callback;
      }),
      redisSubscriptions,
    };
    webSocketService = new WebSocketService(httpServer, mockLogger, mockOrderBookService);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      ioClient = require('socket.io-client')(`http://localhost:${port}`);
      done();
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    ioClient.close();
    webSocketService.io.close();
    httpServer.close();
  });

  test('Client successfully connects and logs connection info', (done) => {
    ioClient.on('connect', () => {
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringMatching(/WebSocket connection established/));
      done();
    });
  });

  test('Client subscribes to a pair and joins the room', (done) => {
    const pair = 'BTC-USD';

    ioClient.emit('subscribe-pair', {pair});

    setTimeout(() => {
      expect(mockLogger.info).toHaveBeenCalledWith(`New Subscription: ${ioClient.id} to ${pair}`);
      expect(webSocketService.io.sockets.adapter.rooms.get(pair)).toBeDefined();
      done();
    }, 100);
  });

  test('Client unsubscribes from a pair and leaves the room', (done) => {
    const pair = 'BTC-USD';

    ioClient.emit('unsubscribe-pair', {pair});

    setTimeout(() => {
      expect(mockLogger.info).toHaveBeenCalledWith(`Unsubscribed: ${ioClient.id} from ${pair}`);
      expect(webSocketService.io.sockets.adapter.rooms.get(pair)).toBeUndefined();
      done();
    }, 100);
  });

  test('Add order calls orderBookService.addOrder', (done) => {
    const pair = 'BTC-USD';
    const order = {id: '1', type: 'buy', price: 50000, quantity: 1};

    ioClient.emit('add-order', {pair, order});

    setTimeout(() => {
      expect(mockOrderBookService.addOrder).toHaveBeenCalledWith(pair, order);
      done();
    }, 100);
  });

  test('Cancel order calls orderBookService.cancelOrder', (done) => {
    const pair = 'BTC-USD';
    const orderId = '1';

    ioClient.emit('cancel-order', {pair, orderId});

    setTimeout(() => {
      expect(mockOrderBookService.cancelOrder).toHaveBeenCalledWith(pair, orderId);
      done();
    }, 100);
  });

  test('Broadcast sends message to the correct room', async () => {
    const pair = 'BTC-USD';
    const data = {bids: [{price: 50000, quantity: 1}], asks: []};
    await webSocketService.subscribeRedisPairChanges();

    ioClient.emit('subscribe-pair', {pair});
    // Wait for the client to join the room
    await new Promise((resolve) => setTimeout(resolve, 1000));
    expect(webSocketService.io.sockets.adapter.rooms.has(pair)).toBe(true);

    const callback = mockOrderBookService
      .subscribePairChanges
      .mock
      .calls
      .find(([subscribedPair]) => subscribedPair === pair)[1];
    callback(data);

    const orderBookMessage = new Promise((resolve) => {
      ioClient.on('orderbook_updates', (message) => {
        resolve(message);
      });
    });

    const message = await orderBookMessage;
    expect(JSON.parse(message)).toEqual(data);
  });

  test('subscribeRedisPairChanges subscribes to pair changes', async () => {
    const mockPairOrders = [
      {pair: 'BTC-USD'},
      {pair: 'ETH-USD'},
    ];
    await webSocketService.subscribeRedisPairChanges();
    expect(mockOrderBookService.subscribePairChanges).toHaveBeenCalledTimes(mockPairOrders.length);
    mockPairOrders.forEach(({pair}) => {
      expect(mockOrderBookService.subscribePairChanges).toHaveBeenCalledWith(pair, expect.any(Function));
    });
  });

  test('Disconnect logs disconnection info', (done) => {
    ioClient.close();

    setTimeout(() => {
      expect(mockLogger.info).toHaveBeenCalledWith(expect.stringMatching(/WebSocket connection closed/));
      done();
    }, 100);
  });
});
