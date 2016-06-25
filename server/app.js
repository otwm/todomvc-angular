var express = require('express');
var app = express();
var path = require('path');

//static 설정
app.use('/', express.static(path.join(__dirname, '../client')));

//node module 설정
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

/**
 * 라우팅
 */
app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});