import Redis from 'ioredis';
import appConfig from '@config/appConfig';
import Logger from '@core/util/Logger';

class RedisClient {
  constructor(instanceName = 'client') {
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
    return (new Redis({
      host: appConfig.redis.host,
      port: appConfig.redis.port,
    }));
  }

  get = async(key) => {
    return this.client.get(key);
  };

  on = (event, callback) => {
    this.client.on(event, callback);
  };

  publish = async(channel, message) => {
    return this.client.publish(channel, JSON.stringify(message));
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
}

export default RedisClient;