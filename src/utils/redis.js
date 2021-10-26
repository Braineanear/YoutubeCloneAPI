import client from '../config/redis';
import logger from '../config/logger';

/**
 * * this the method for set any key with the tts value.
 * @param redisKey
 * @param value
 * @param ttl in mili seconds
 * @returns true
 */
export const setValue = async (redisKey, value, ttl) =>
  new Promise((resolve) => {
    if (ttl) {
      client.set(redisKey, value, 'EX', ttl, (err, res) => {
        if (err) logger.error(err);
        resolve(res);
      });
    } else {
      client.set(redisKey, value, (err, res) => {
        if (err) logger.error(err);
        resolve(res);
      });
    }
  });

/**
 * * this the method for get any key's value.
 * @param redisKey
 * @returns value
 */
export const getValue = async (redisKey) =>
  new Promise((resolve) => {
    client.get(redisKey, (err, res) => {
      if (err) logger.error(err);
      resolve(res);
    });
  });

/**
 * * method to delete the key from redis.
 * @param redisKey
 */
export const deleteKey = async (redisKey) =>
  new Promise((resolve) => {
    client.delete(redisKey, (err, res) => {
      if (err) logger.error(err);
      resolve(res);
    });
  });

/**
 * * method to lrange in the redis list.
 * @param redisKey
 * @param start
 * @param stop
 */
export const getList = async (redisKey, start, stop) =>
  new Promise((resolve) => {
    client.lrange(redisKey, start, stop, (err, res) => {
      if (err) logger.error(err);
      resolve(res);
    });
  });

export const generateCacheKey = (...params) => params.join('-').trim();
