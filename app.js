const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
const route = require('./Routers/route');
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

app.use('/', route);

app.listen(7700, function (err) {
    if (err) {
        console.log("something went wrong");
    }
    else {
        console.log('server created successfully..');
    }
});