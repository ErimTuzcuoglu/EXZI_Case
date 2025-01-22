import {Server} from 'socket.io';
import pairOrdersMockData from '../database/redis/mock-data/PairOrders';

export default class WebSocketService {
  constructor(httpServer, logger, orderBookService) {
    this.io = new Server(httpServer, {
      cors: {
        origin: '*',
      },
      methods: ['GET', 'POST'],
    });
    this.orderBookService = orderBookService;
    this.logger = logger;

    this.handle();
  }

  handle = () => {
    this.io.on('connection', (socket) => {
      this.logger.info(`WebSocket connection established: ${socket.id}`);

      socket.on('subscribe-pair', ({pair}) => this.onSubscribeToPair(socket, pair));
      socket.on('unsubscribe-pair', ({pair}) => this.onUnsubscribeToPair(socket, pair));
      socket.on('add-order', ({pair, order}) => this.onAddOrder(pair, order));
      socket.on('cancel-order', ({pair, orderId}) => this.onCancelOrder(pair, orderId));

      socket.on('disconnect', () => this.onDisconnect(socket));
      socket.on('error', this.onError);
    });
  };

  /* #region  Event functions */
  onSubscribeToPair = (socket, pair) => {
    this.logger.info(`New Subscription: ${socket.id} to ${pair}`);
    socket.join(pair);
  };

  onUnsubscribeToPair = (socket, pair) => {
    this.logger.info(`Unsubscribed: ${socket.id} from ${pair}`);
    socket.leave(pair);
  };

  onAddOrder = async (pair, order) => {
    await this.orderBookService.addOrder(pair, order);
  };

  onCancelOrder = async (pair, orderId) => {
    await this.orderBookService.cancelOrder(pair, orderId);
  };

  onDisconnect = (socket) => {
    this.logger.info(`WebSocket connection closed: ${socket.id}`);
  };

  onError = (error) => {
    this.logger.error(error);
  };
  /* #endregion */

  broadCastPairChanges = (pair, data) => {
    this.io.to(pair).emit('orderbook_updates', JSON.stringify(data));
  };

  subscribeRedisPairChanges = async () => {
    const pairs = pairOrdersMockData.map(({pair}) => pair);
    for (const pair of pairs) {
      await this.orderBookService.subscribePairChanges(pair, (message) => {
        this.broadCastPairChanges(pair, JSON.parse(message));
      });
    }
  };
};
