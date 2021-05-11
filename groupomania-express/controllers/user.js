const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const connectionSQL = require('../utils/connectionSQL');
const xss = require('xss');
var mysql = require('mysql');

exports.signup = (req, res, next) => {
    var sql_req = 'INSERT INTO user(email, password, registration_date) VALUES (??, ??, NOW())';
    bcrypt.hash(xss(req.body.password),10)
    .then(hash => {
        var sql_values = [ xss(req.body.email), hash]
        })
        sql_req = mysql.preparer(mysql, sql_req, sql_values)
    .catch(error => res.status(400).json({ message : error }));
};