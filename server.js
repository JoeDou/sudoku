var express = require('express');
var app = express();
var port = process.env.Port || 9000;

app.listen(port);

app.use(express.static(__dirname + '/'));

console.log('Live on port 9000');