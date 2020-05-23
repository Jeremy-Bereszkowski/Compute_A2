'use strict';

const express = require('express');
const mysql = require('promise-mysql');
const bodyParser = require('body-parser');
const cors = require('cors')

var router = express.Router();

// Automatically parse request body as form data.
router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(cors())

router.options('/login', cors())

let pool;
const createPool = async () => {
  pool = await mysql.createPool({
    user: "root",
    password: "hello",
    database: "test",
    
    // If connecting via unix domain socket, specify the path
    socketPath: '/cloudsql/compute-a2-2020:australia-southeast1:compute-a2-mysql',
    
    // If connecting via TCP, enter the IP and port instead
    //host: '127.0.0.1',
    //port: 1433,

    connectionLimit: 5,
    connectTimeout: 10000,
    acquireTimeout: 10000,
    waitForConnections: true,
    queueLimit: 0,
  });

};
createPool();

exports.auth = router.post('/login', cors(), async (req, res) => {
  try {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.set('Access-Control-Max-Age', '3600');

    //Create new deposit record
    const getUserDetails = 'select user_id, fname, password, clearance from users where email="' + req.body.uname + '";';

    //Run query - fetch response
    var userDetails = await pool.query(getUserDetails);

    if (userDetails.length < 1) {
      res.status(403).send({message: 'Unkown E-Mail'}).end();
    }
    else if (userDetails[0].password === req.body.pword) {
      res.status(200).send({user_id: userDetails[0].user_id, fname: userDetails[0].fname, clearance: userDetails[0].clearance}).end();
    }
    else {
      res.status(403).end(JSON.stringify({message: 'Incorrect Password'}));
    }
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});

exports.auth = router.get('/favCity/:user_id', async (req, res) => {
var userID = req.params.user_id

  try {
    const getFavCity = 'select fav_city from user_favorite_city where user_id='+userID+';';

    //Run query - fetch response
    var favCity = await pool.query(getFavCity);

    res.status(200).send(favCity).end();
  } catch (err) {
    res.status(500).send('Connection error!').end();
  }
});