'use strict';
const bodyParser = require('body-parser');
const chalk = require('chalk');

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

let friendList = []

module.exports = function(app){

	app.get('/api/friends', function(req, res) {
		console.log('\n' + chalk.bgMagenta('[GET] => /api/friends') + ':\n' + req.body);
	});

	app.post('/api/friends', jsonParser,  function(req, res) {
		console.log('\n' + chalk.bgMagenta('[POST] => /api/friends') + ':\n' , req.body);
		friendList.push(req.body);
		console.log(friendList);
	});
};