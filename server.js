'use strict';

// ==Modules==
const express = require('express');


// ==Express Setup==
const app = express();
app.set('port', (process.env.PORT || 5000));

//===Routes===
//api
require('./app/routing/apiRoutes')(app);
//html
require('./app/routing/htmlRoutes')(app);

//Start Server
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//===Static Files, CSS,Images,Fonts===
app.use(express.static('app/public'));