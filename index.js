// express set up
var express = require('express')
var app = express()
var port = process.env.PORT || 7777

// mongoose setup
var dbURI = process.env.PROD_MONGODB || 'mongodb://localhost:27017/shoppingbookmark'
var mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(dbURI)

var ejsLayouts = require('express-ejs-layouts')
app.set('view engine', 'ejs')
app.use(ejsLayouts)

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('really really connected. like for real!');
});

var bodyParser = require('body-parser')

app.use(express.static('public')) // link css files and stuff

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.render('index')
})

app.use('/auth', require('./controllers/auth'));

app.listen(port, function() {
  console.log('express is running on port ' + port)
})
