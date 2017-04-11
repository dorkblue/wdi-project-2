// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 4500

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/mymdb'
var mongoose = require('mongoose')
mongoose.connect(dbURI)

app.set('view engine', 'ejs')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('really really connected. like for real!');
});

var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.send('index')
})
