'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    socketPath: '/cloudsql/compute-a2-2020:australia-southeast1:compute-a2-mysql',
    
    // If connecting via TCP, enter the IP and port instead
    //host: process.env.DB_HOST,
    //port: process.env.DB_PORT,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });

};
createPool();

exports.auth = router.post('/login', async (req, res) => {
  const username = req.body.uname;
  const password = req.body.pword;

  try {
    //Create new deposit record
    const getUserDetails = 'select password, clearance from users where email="' + username + '";';

    //Run query - fetch response
    var userDetails = await pool.query(getUserDetails);

    if (userDetails.length < 1) {
      res.status(403).send({message: 'Unkown E-Mail'}).end();
    }
    else if (userDetails[0].password === password) {
      res.status(200).send(userDetails[0].clearance).end();
    }
    else {
      res.status(403).end(JSON.stringify({message: 'Incorrect Password'}));
    }
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});