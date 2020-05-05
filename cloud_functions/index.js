const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

// [START cloud_sql_mysql_mysql_create]
let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    socketPath: '/cloudsql/compute-a2-2020:australia-southeast1:compute-a2-mysql',//${process.env.CLOUD_SQL_CONNECTION_NAME}',
    
    // If connecting via TCP, enter the IP and port instead
    /* host: '127.0.0.1',
    port: 1433, */

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });
};
createPool();

exports.helloWorld = router.get('/helloWorld', async (req, res) => {
    try {
        const testQuery = 'select * from test;';
    
        //Run queries
        var testData = await pool.query(testQuery);

    } catch (err) {
        res.end(err);
    }
    
    res.end(JSON.stringify({testData: testData}));
    //res.end('Hello, World!');
});