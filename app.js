const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/public/Tasks'));
// app.use(express.static(__dirname + '/public/FetchAPI_JsonPlaceHolder'));
// app.use(express.static(__dirname + '/public/Attendence'));
app.use(cookieParser());

const route = require('./Routers/route');
// route(app, conn, md5, jwt);

app.use('/', route);

app.listen(7700, function (err) {
    if (err) {
        console.log("something went wrong");
    }
    else {
        console.log('server created successfully..');
    }
});