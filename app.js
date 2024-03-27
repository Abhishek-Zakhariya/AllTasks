const express = require('express');
const mysql = require('mysql');
const app = express();
const route = require('./route');
const md5 = require("blueimp-md5");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public/Tasks'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'abhi2509',
    database: '21March'
});

conn.connect(function (err) {
    if (err) throw err;
})

route(app, conn, md5);

app.listen(7700, function (err) {
    if (err) {
        console.log("something went wrong");
    }
    else {
        console.log('server created successfully..');
    }
});