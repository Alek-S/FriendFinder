'use strict';
const path = require('path');

const bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()


module.exports = function(app){

	app.get('/api/friends', function(req, res) {
	});

	app.post('/api/friends', jsonParser,  function(req, res) {
		console.log(req.body);
		
	});
};