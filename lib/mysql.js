import mysql from 'mysql'
// import redisClient from './redis'

const connection = mysql.createConnection('mysql2://root:AJEuM4z62l5we0rz@10.48.160.3:3306/staging')

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});


connection.query('SELECT 1', function (error, results, fields) {
  if (error) throw error;
  // connected!
});

