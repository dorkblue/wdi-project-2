var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var request = require('request');
var itemController = require('../controllers/item_controller')

router.get('/create', function(req, res) {
  res.render('item/create');
});

router.get('/', itemController.itemList)
router.post('/item/delete', itemController.removeItem)

router.get('/item/:itemId/edit', function(req, res) {
  var itemId = req.params.itemId
  Item.find({_id: itemId}, (err, output) => {
    if (err) console.error(err)
    res.render('item/edit', {
      foundItem: output
    })
  })
})

router.post('/item/edit', itemController.editItem)
router.post('/create', itemController.createItem)

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
