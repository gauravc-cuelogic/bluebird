"use strict"

const configs = require('../config/config.js');
const mysql = require('mysql');
const bluebird = require('bluebird') ;
const connection = mysql.createConnection(configs.database);
      connection.connect();
module.exports.connection = bluebird.promisifyAll(connection);;
