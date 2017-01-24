//Modules
var express = require('express');
var app = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

//Configuration
mongoose.connect('mongodb://localhost/youtunes');
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

//Mongoose database model
  var Song = mongoose.model('Song', {
      text : String
  });

    //Gets all of the songs from /api/list
    app.get('/api/list', function(req, res) {
        //Mongoose to find all songs in db
        Song.find(function(err, list) {
            if (err)
                res.send(err)
            res.json(list); // return all songs in JSON
        });
    });

    //Creates a new song entry
    app.post('/api/list', function(req, res) {
        Song.create({
            text : req.body.text,
            done : false
        }, function(err, list) {
            if (err)
                res.send(err);
            //After creating, send back all songs
            Song.find(function(err, list) {
                if (err)
                    res.send(err)
                res.json(list);
            });
        });

    });

    //Removes a song from the list
    app.delete('/api/list/:list_id', function(req, res) {
        Song.remove({
            _id : req.params.list_id
        }, function(err, list) {
            if (err)
                res.send(err);

           //Get all songs after song post created
            Song.find(function(err, list) {
                if (err)
                    res.send(err)
                res.json(list);
            });
        });
    });

    //Load single page front-end Angular
    // app.get('*', function(req, res) {
    //     res.sendFile('./public/index.html');
    // });

    // listen
    var port = process.env.PORT || 3000;
    app.listen(3000);
    console.log("App listening on port 3000");