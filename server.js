//Modules
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Configuration
mongoose.connect('mongodb://localhost/youtunes');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//Model
var Song = mongoose.model('Song', {
  text: String
});

//API Routes

//Get all songs
  //Use mongoose API to get all songs in the database
    //If error, send error
    //Return all songs in JSON format

//Create new song post
  //Data from AJAX request from Angular
    //Get and return all songs

//Delete a song if delete button is clicked on

//Frontend Angular Routes
 app.get('*', function(req, res) {
        res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

//Listen on port
 app.listen(8080);
console.log("YouTunes listening on port 8080");