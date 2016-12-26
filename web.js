var express = require('express');
var bodyparser = require('body-parser');

var app = express();

app.use(bodyparser.json());

app.post('/', function(request, response){
  console.log(request.body);
  response.send(request.body);
});

app.listen(80);
console.log("Server Listening...");