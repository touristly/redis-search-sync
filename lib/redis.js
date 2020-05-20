import redis from 'redis'
import rediSearchClient from 'redisearchclient'
import redisearch from 'redis-redisearch';
import { logger } from '../utils'

redisearch(redis);
const indexName = 'activities'

const client = redis.createClient({
  host: process.env.REDIS_HOST
})
const redisSearch = rediSearchClient(client, indexName)

const createIndex = () => {
  redisSearch.createIndex([
    redisSearch.fieldDefinition.text('title', true, {}),
    redisSearch.fieldDefinition.text('description', true, {}),
    redisSearch.fieldDefinition.text('destination', true, {}),
    redisSearch.fieldDefinition.numeric('offerId', false, {})
  ], (err, val) => {
    if (err) {
      logger.error('An error occured while creating redis search index', err);
    }
    logger.info(`${indexName}: index has been created in Redis Search!`);
  })
}

const addRecord = ({ offerId, data }) => new Promise((resolve, reject) => {
  redisSearch.add(offerId, data, {
    score: 1
  }, (err, res) => err ? reject(err) : resolve(res))
})

const searchRecord = (query) => new Promise((resolve, reject) => redisSearch.search(`%${query}%`, (err, res) => err ? reject(err) : resolve(res.results)))

export {
  createIndex,
  searchRecord,
  addRecord
}


