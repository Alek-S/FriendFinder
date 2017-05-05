'use strict';
const path = require('path');
const chalk = require('chalk');

module.exports = function(app){

	app.get('/', function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [GET] => /') );
		console.log(chalk.bgBlue('Response [GET] => /') + ':\n' , path.join(__dirname, '../public/home.html'));
		res.sendFile(path.join(__dirname, '../public/home.html'));
	});

	app.use('/survey', function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [GET] => /') );
		console.log(chalk.bgBlue('Response [GET] => /survey') + ':\n' , path.join(__dirname, '../public/survey.html'));
		res.sendFile(path.join(__dirname, '../public/survey.html'));
	});
};