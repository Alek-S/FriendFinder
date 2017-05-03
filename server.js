'use strict';

// ==Modules==
const express = require('express');
const bodyParser = require('body-parser');

// ==Express Setup==
const app = express();
const PORT = 3000;

//===Routes===
//require('./app/routing/apiRoutes')(app);
require('./app/routing/htmlRoutes')(app);


// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Start Server
app.listen(PORT, function() {
	console.log('App listening on PORT ' + PORT);
});

//===Static Files, CSS,Images,Fonts===
app.use(express.static('app/public'));