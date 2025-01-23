import {createServer} from 'http';
import ServerConfig from '@core/server/config/server';
import RedisClient from '@core/database/redis/redisClient';
import Seeder from '@core/database/redis/seeder';
import Logger from '@core/util/Logger';
import config from '@config/appConfig';
import WebSocketService from '@core/socket/WebSocketService';
import OrderBookService from '@application/services/OrderBookService';
import OrderBookRepository from '@core/database/redis/repositories/OrderBookRepository';

async function startServer() {
  const server = createServer((req, res) => {
    // middleware and routing logic
    (new ServerConfig({req, res, config}));
  });

  /* #region  Redis */
  const redisSubscribeClient = new RedisClient('subscribeClient');
  const redisClient = new RedisClient();
  await (new Seeder({
    redis: redisClient,
    logger: Logger,
  })).seedBidsAndAsks();
  /* #endregion */

  /* #region  Socket */
  const orderBookDBRepository = new OrderBookRepository({
    redisSubscribeClient,
    redisClient,
    logger: Logger,
  });
  const orderBookService = new OrderBookService(orderBookDBRepository);

  const socketIO = new WebSocketService(
    server,
    Logger,
    orderBookService,
  );
  await socketIO.subscribeRedisPairChanges();
  /* #endregion */
  /* #region  Server */
  server.listen(config.port, () => {
    Logger.log(`Server is listening on port ${config.port}`);
  });
  /* #endregion */

  return server;
}

startServer().catch((error) => {
  Logger.error(error);
});
