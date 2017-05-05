'use strict';
const bodyParser = require('body-parser');
const chalk = require('chalk');
const _ = require('lodash');


// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

//friendList with placeholder friends
let friendList = [
	{ name: 'Bob',
		photo: 'https://pbs.twimg.com/profile_images/659846506678124544/qptu8mfw.jpg',
		result: [ '1', '4', '2', '4', '2', '3', '2', '4', '2', '3' ] },
	{ name: 'Susan',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Susan_Junket_%28cropped%29.jpg/355px-Susan_Junket_%28cropped%29.jpg',
		result: [ '4', '4', '2', '3', '4', '3', '2', '4', '3', '1' ] },
	{ name: 'Albert',
		photo: 'https://media1.britannica.com/eb-media/19/80619-004-9B9D0D26.jpg',
		result: [ '3', '1', '4', '1', '2', '1', '4', '5', '5', '5' ] }
];

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



