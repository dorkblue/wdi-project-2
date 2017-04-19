let Item = require('../models/item')
var request = require('request');

function itemList(req, res) {
  console.log('log in ITEMLIST', req.user)
  Item.find({
    user_id: req.user._id
  }, (err, output) => {
    if (err) res.send(err)
    // console.log(output)
    res.render('index', {
      allItems: output,
      userName: req.user.username
    })
  })
}

function createItem(req, res) {
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
          res.redirect('/homepage')
        })
      })
    }
  })
}

function removeItem(req, res) {
  var userId = Object.keys(req.body)
  Item.remove({
    _id: userId[0]
  }, (err, output) => {
    if (err) return console.err(err)
    res.redirect('/homepage')
  })
}

function editItem(req, res) {
  Item.update({
    _id: req.body.item_id
  }, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
      imageurl: req.body.imageurl
    }
  }, (err, output) => {
    if (err) console.error(err)
    res.redirect('/homepage')
  })
}

function searchItem(req, res) {
  Item.find( { tag: req.body.search, user_id: req.user._id }, (err, output) => {
    if (output == null) req.flash('Could not find any items, please try again!')
    res.render('index', {
      allItems: output,
      userName: req.user.username
    })
  })
}

function editItemPage(req, res) {
  var itemId = req.params.itemId
  Item.find({ _id: itemId }, (err, output) => {
    res.render('item/edit', {
      foundItem: output
    })
  })
}

module.exports = {
  itemList: itemList,
  createItem: createItem,
  removeItem: removeItem,
  searchItem: searchItem,
  editItemPage: editItemPage,
  editItem: editItem
}
