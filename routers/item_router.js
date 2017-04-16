var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var itemController = require('../controllers/item_controller')

router.get('/create', function(req, res) {
  res.render('item/create');
});

router.get('/', itemController.itemList)

router.post('/create', function(req, res) {
  Item.create({
    title: req.body.title,
    url: req.body.url,
    description: req.body.description,
    tag: req.body.tag,
    user_id: req.user._id,
  }, function(err, createdItem) {
    if(err){
      console.log('item was not created');
      res.redirect('/create');
    } else {
      console.log('item was created');
      res.redirect('/');
    }
  });
});

router.post('/', function(req, res) {
  Item.find( { tag: req.body.search, user_id: req.user._id }, (err, output) => {
    if (err) res.send(err)
    res.render('index', {
      allItems: output,
      userName: req.user.username
    })
  })
})

module.exports = router
