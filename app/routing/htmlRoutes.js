'use strict';
const path = require('path');


module.exports.root = function(req, res) {
	res.sendFile(path.join(__dirname, '../public/home.html'));
};


module.exports.survey = function(req, res) {
	res.sendFile(path.join(__dirname, '../public/survey.html'));
};
