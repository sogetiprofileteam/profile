// this file is the server file for the heroku deployment
var express = require('express'); 
var app = express();
// serve static assets
app.use(express.static(__dirname + '/dist'));
// support ui routes
app.all('/*', function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile('index.html', { root: __dirname + '/dist' });
});
var port = process.env.PORT || 8080;
app.listen(port, () => console.log('running on port ' + port));