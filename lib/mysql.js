import mysql from 'mysql'
import { createIndex, addRecord, searchRecord } from './redis'
import { logger } from '../utils'

createIndex()
const connection = mysql.createConnection('')

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
  }
  console.log('connected to mysql as id ' + connection.threadId);
});

const query = connection.query('select o.title, o.summary, o.id, d.name from offers o inner join destinations d on o.destination_id = d.id and o.is_published = 1');

query
  .on('error', function (err) {
    logger.error('An error occured', err);
  })
  .on('result', function (row) {
    connection.pause();

    const {
      summary: description,
      title,
      name: destination,
      id: offerId
    } = row

    const data = {
      destination,
      title,
      description,
      offerId
    }

    addRecord({
      offerId,
      data
    }).then(res => {
      logger.info(`Added offer record to index, offerId: ${offerId}`)
    }).catch(err => {
      logger.error("Error occured while adding record to index", err)
    })

    connection.resume();
  })
  .on('end', function () {
    logger.info('Done. All rows have been fetched!');
  });