var express = require('express');
var mysql = require('mysql');
const cookieSession = require('cookie-session');

const userRoute = require('./routes/user');

var app = express();



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

var expiryDate = new Date(Date.now() + 60 * 60 * 1000)
app.use(cookieSession({
    name: 'session',
    keys: ["Mieux communiquer pour mieux travailler", "Groupomania", "chatting", "Commentaire"],
    cookie: {
      secure: true,
      httpOnly: true,
      domain: 'http://localhost:3000/',
      expires: expiryDate
    }
}))


app.use('/api/auth', userRoute);

var server = app.listen(5000, function () {
    console.log('Server is running..');
});