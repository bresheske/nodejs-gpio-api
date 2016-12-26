var express = require('express');
var bodyparser = require('body-parser');
var repo = require('./gpioRepository.js');

var app = express();

app.use(bodyparser.json());

app.post('/getStatus', function(req, res){
	var id = req.body.id;
	var status = repo.checkStatus(id);
	res.send({ "id": id, "status": status });
});

app.post('/setStatus', function(req, res){
	var id = req.body.id;
	var reqstatus = req.body.status;
	repo.writeStatus(id, reqstatus);
	var resstatus = repo.checkStatus(id);
	res.send({ "id": id, "status": resstatus });
});

app.post('/toggleStatus', function(req, res){
	var id = req.body.id;
	repo.toggleStatus(id);
	var resstatus = repo.checkStatus(id);
	res.send({ "id": id, "status": resstatus });
});

console.log("Opening port...");
app.listen(80);
console.log("Server listening.");
console.log("Opening GPIO pins...");
repo.openAll();
console.log("Opened.");