var repo = function() {};
var fs = require('fs');
var pins = [ 4, 17, 27, 22, 5, 6, 13, 19, 26, 23, 24, 25, 12, 16, 20, 21 ];

var checkStatus = function(id){
	var file = "/sys/class/gpio/gpio" + id + "/value";
	var data = fs.readFileSync(file, 'utf8');
	data = data.replace(/^\s+|\s+$/g, '');
	var val = data == "0"
		? true
		: false;
	return val;
};

var writeStatus = function(id, value){
	var val = value == true
		? 0 
		: 1;
	fs.writeFileSync('/sys/class/gpio/gpio' + id + '/value', val);
};

var toggleStatus = function(id){
	var value = checkStatus(id);
	var val = !value;
	writeStatus(id, val);
};

var openAll = function() {
	pins.forEach(function(pin){
		var file = '/sys/class/gpio/';
		
		// Unexport first.
		try{
			fs.writeFileSync(file + 'unexport', pin);
		}
		catch(ex){
			console.log("Warning: error unexporting id " + pin + ". Might not be exported. Ignoring...");
		}
		
		// Now export.
		fs.writeFileSync(file + 'export', pin);
		
		// Set directions
		fs.writeFileSync(file + 'gpio' + pin + '/direction', 'out');
	});
};

repo.prototype.toggleStatus = toggleStatus;
repo.prototype.openAll = openAll;
repo.prototype.checkStatus = checkStatus;
repo.prototype.writeStatus = writeStatus;

module.exports =  new repo();