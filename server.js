'use strict';

// ==Modules==
const express = require('express');


// ==Express Setup==
const app = express();
// const PORT = 3000;

//===Routes===
//api
require('./app/routing/apiRoutes')(app);
//html
require('./app/routing/htmlRoutes')(app);

//Start Server
app.listen(.listen(process.env.PORT || PORT), function() {
	console.log('App listening on PORT ' + PORT);
});

//===Static Files, CSS,Images,Fonts===
app.use(express.static('app/public'));