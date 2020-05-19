import redis from 'redis'
import rediSearchClient from 'redisearchclient'
import redisearch from 'redis-redisearch';

redisearch(redis);

const client = redis.createClient({
  host: process.env.REDIS_HOST
})
const data = rediSearchClient(client, 'sample')

data.createIndex([
  data.fieldDefinition.text('name', true, {}),
  data.fieldDefinition.text('city', true, {}),
  data.fieldDefinition.text('country', true, {})
], (err, val) => {
  console.log({ err, val });
})

data.add('sample', {
  name: 'Ankit',
  city: "Mumbai",
  country: "India"
}, {
  score: 1
}, (err, res) => {
  if (err) { throw err; }
  console.log('added!');
})

data.search('ankit', (err, res) => {
  if (err) { throw err; }
  console.log(res.results[0].doc);
})