import redis from 'redis'
import redisearch from 'redis-redisearch'

redisearch(redis);

export const client = redis.createClient();

