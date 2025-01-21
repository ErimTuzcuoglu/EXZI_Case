import redis from 'redis';

class RedisClient {
  constructor() {
    if (!RedisClient.instance) {
      this.client = redis.createClient({
        host: 'localhost',
        port: 6379,
      });

      this.client.on('connect', () => {
        console.log('Redis connected');
      });

      this.client.on('error', (err) => {
        console.error('Redis error:', err);
      });

      RedisClient.instance = this;
    }

    return RedisClient.instance;
  }

  getClient() {
    return this.client;
  }
}

const instance = new RedisClient();
Object.freeze(instance);

export default instance;