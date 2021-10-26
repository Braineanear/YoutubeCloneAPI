import redis from 'redis';

import config from './config';
import logger from './logger';

const redisPort = config.redis.port;

/**
 * Create Redis Client
 * @param {number} redisPort
 * @returns {Object}
 */
const client = redis.createClient(redisPort);

client.on('connect', () => {
  logger.info('Redis client connected');
});

client.on('error', (err) => {
  logger.error(`Redis Error: ${err}`);
});

export default client;
