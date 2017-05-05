'use strict';
const bodyParser = require('body-parser');
const chalk = require('chalk');
const _ = require('lodash');


// const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();

//friendList with placeholder friends
let friendList = [
	{ name: 'Bob',
		photo: 'https://yt3.ggpht.com/-uJh4oSQAwak/AAAAAAAAAAI/AAAAAAAAAAA/AMGKfKvDP3w/s900-c-k-no-mo-rj-c0xffffff/photo.jpg',
		result: [ '1', '4', '2', '4', '2', '3', '2', '4', '2', '3' ] },
	{ name: 'Susan',
		photo: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTg4ODMzMDUzNF5BMl5BanBnXkFtZTcwNzY4NzQwMw@@._V1_UY317_CR6,0,214,317_AL_.jpg',
		result: [ '4', '4', '2', '3', '4', '3', '2', '4', '3', '1' ] },
	{ name: 'Albert',
		photo: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Albert_Einstein_Head.jpg',
		result: [ '3', '1', '4', '1', '2', '1', '4', '5', '5', '5' ] }
];

module.exports = function(app){

	app.get('/api/friends', function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [GET] => /api/friends') );
		console.log(chalk.bgBlue('Response [GET] => /api/friends') + ':\n' , friendList);
		return res.json(friendList);
	});

	app.post('/api/friends', jsonParser,  function(req, res) {
		console.log('\n' + chalk.bgMagenta('Request [POST] => /api/friends') + ':\n' , req.body);
		friendList.push(req.body);
		console.log(chalk.cyan('Full Friend List:'), friendList);
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



