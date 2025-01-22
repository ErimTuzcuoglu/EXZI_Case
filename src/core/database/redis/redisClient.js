import {createClient} from 'redis';
import appConfig from '@config/appConfig';
import Logger from '@core/util/Logger';

class RedisClient {
  constructor(instanceName = 'defaultClient') {
    if (!RedisClient.instance) {
      this.client = this.createNewInstance();

      this.client.on('connect', () => {
        Logger.info(`Redis [${instanceName}] connected`);
      });

      this.client.on('error', (err) => {
        Logger.error(`Redis [${instanceName}] error:`, err);
      });
    }
  }

  createNewInstance() {
    return createClient({
      socket: {
        host: appConfig.redis.host,
        port: appConfig.redis.port,
      },
    });
  }

  get getClient() {
    return this.client;
  }

  connect = async() => {
    return this.client.connect();
  };

  exists = async (key) => {
    return this.client.exists(key);
  };

  get = async(key) => {
    return this.client.get(key);
  };

  publish = async(channel, message) => {
    return this.client.publish(channel, JSON.stringify(message,
    ));
  };

  quit = async() => {
    return this.client.quit();
  };

  set = async(key, value) => {
    return this.client.set(key, value);
  };

  subscribe = async(channel, callback) => {
    return this.client.subscribe(channel, callback);
  };

  zAdd = async(key, score, value) => {
    return this.client.zAdd(
      key,
      [{
        score,
        value: JSON.stringify(value),
      }],
    );
  };

  zRange = async(key, start, stop, withScores = false) => {
    return this.client.sendCommand([
      'ZRANGE',
      key,
      start.toString(),
      stop.toString(),
      (withScores ? 'WITHSCORES' : undefined),
    ]);
  };

  zRevRange = async(key, start, stop, withScores = false) => {
    return this.client.sendCommand([
      'ZREVRANGE',
      key,
      start.toString(),
      stop.toString(),
      (withScores ? 'WITHSCORES' : undefined),
    ]);
  };
}

export default RedisClient;