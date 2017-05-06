'use strict';
const bodyParser = require('body-parser');
const chalk = require('chalk');
const _ = require('lodash');
let friendList = require('../data/friends')


// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

module.exports = function(app){

	app.get('/api/friends', function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [GET] => /api/friends') );
		console.log(chalk.bgBlue('Response [GET] <= /api/friends') + ':\n' , friendList);

		return res.json(friendList);
	});

	app.post('/api/friends', jsonParser,  function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [POST] => /api/friends') + ':\n' , req.body);
		friendList.push(req.body);

		console.log(chalk.bgBlue('Response [POST] <= /api/friends') + ':\n' , matchLatest());
		res.send( matchLatest() );
	});
};


//Finds the best math for latest entry into friendList
//and return the best match as an object
function matchLatest(){
	let latestFriend = friendList[friendList.length - 1].result.map(Number); //result array of latest person added
	let totalDifference = []; //array of difference scores
	let bestMatch = undefined; //the best match for latest friend

	//for each friend except latest
	for (let i = 0; i < (friendList.length -1); i++) {
		let currentFriend = friendList[i].result.map(Number); //current friend being looked at score array
		let currentDifference = []; //array of how different each question is
		let diffScore = 0; //total difference score

		//compare current friend to latest friend to populate currentDifference array
		for (let j = 0; j < currentFriend.length; j++) {
			currentDifference.push( Math.abs( latestFriend[j] - currentFriend[j] ) );
		}

		//sum up currentDifference array and put scro into diffScore
		currentDifference.forEach( (score)=>{
			diffScore += score;
		});

		//pusg current friends diff score into totalDifference
		totalDifference.push(diffScore);

	}

	//finde the minimal score within totalDifference, look up who that is in friendList, and save that friend to bestMatch
	bestMatch = friendList[ totalDifference.indexOf( _.min(totalDifference) ) ];
	return bestMatch;
}



