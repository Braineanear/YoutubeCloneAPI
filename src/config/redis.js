import redis from 'redis';

import config from './config';
import logger from './logger';

const { host, port, password } = config.redis;

/**
 * Create Redis Client
 * @param {number} redisPort
 * @returns {Object}
 */
const client = redis.createClient({ host, port, password });

client.on('ready', () => {
  logger.info('Redis client ready');
});

client.on('connect', () => {
  logger.info('Redis client connected');
});

client.on('error', (err) => {
  logger.error(`Redis client error: ${err}`);
});

export default client;
