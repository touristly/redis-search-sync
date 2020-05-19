import redis from 'redis'
import rediSearchClient from 'redisearchclient'
import redisearch from 'redis-redisearch';

redisearch(redis);
const indexName = 'activities'

const client = redis.createClient({
  host: process.env.REDIS_HOST
})
const redisSearch = rediSearchClient(client, indexName)

redisSearch.createIndex([
  redisSearch.fieldDefinition.text('title', true, {}),
  redisSearch.fieldDefinition.text('description', true, {}),
  redisSearch.fieldDefinition.text('destination', true, {}),
  redisSearch.fieldDefinition.numeric('offerId', false, {})
], (err, val) => {
  if (err) {
    console.error(err);
  }
  console.log('Redis search index has been created', val);
})

const addRecord = ({ offerId, data }) => new Promise((resolve, reject) => {
  redisSearch.add(offerId, data, {
    score: 1
  }, (err, res) => err ? reject(err) : resolve(res))
})

const searchRecord = (query) => new Promise((resolve, reject) => redisSearch.search(query, (err, res) => err ? reject(err) : resolve(res.results)))

export {
  searchRecord,
  addRecord
}


