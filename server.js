'use strict';

// ==Modules==
const express = require('express');
const bodyParser = require('body-parser');


//===Routes===
const api = require('./app/routing/apiRoutes');
const page = require('./app/routing/htmlRoutes');

// ==Express Setup==
const app = express();
const PORT = 3000;

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


//==Routing==
app.get('/survey', page.survey);
app.use('/', page.root);

