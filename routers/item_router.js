var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var request = require('request');
var itemController = require('../controllers/item_controller')

router.get('/homepage', itemController.itemList)

router.get('/create', function(req, res) {
  res.render('item/create');
});

router.post('/item/delete', itemController.removeItem)
router.post('/item/edit', itemController.editItem)
router.post('/create', (req, res) => {
  Item.create({
    title: "default",
    url: req.body.url,
    description: "default",
    imageurl: "default",
    tag: req.body.tag,
    user_id: req.user._id,
  }, function(err, createdItem) {
    if (err) {
      console.log('item was not created');
      res.redirect('/create');
    } else {
      var encoded = encodeURIComponent(req.body.url)
      var url = 'http://api.linkpreview.net/?key=' + process.env.LINK_PREVIEW_API_KEY + '&q=' + encoded
      request(url, function(error, response, body) {
        // console.log('error:', error); // Print the error if one occurred
        // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        // console.log('body:', body); // Print the HTML for the Google homepage.
        var parseBody = JSON.parse(body)
        Item.update({
          _id: createdItem._id
        }, {
          $set: {
            title: parseBody.title,
            description: parseBody.description,
            imageurl: parseBody.image
          }
        }, function(err, output) {
          if (err) console.log(err);
          // if (output) console.log(output);
          res.redirect('/homepage')
        })
      })
    }
  })
})

router.post('/homepage', function(req, res) {
  Item.find( { tag: req.body.search, user_id: req.user._id }, (err, output) => {
    if (output == null) req.flash('Could not find any items, please try again!')
    res.render('index', {
      allItems: output,
      userName: req.user.username
    })
  })
})

router.get('/item/:itemId/edit', function(req, res) {
  var itemId = req.params.itemId
  Item.find({_id: itemId}, (err, output) => {
    res.render('item/edit', {
      foundItem: output
    })
  })
})

module.exports = router
