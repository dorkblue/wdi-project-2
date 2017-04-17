let Item = require('../models/item')

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
          res.redirect('/')
        })
      })
    }
  })
}


function itemList(req, res) {
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

function removeItem(req, res) {
  var userId = Object.keys(req.body)
  Item.remove({
    _id: userId[0]
  }, (err, output) => {
    if (err) return console.err(err)
    res.redirect('/')
  })
}

function editItem(req, res) {
  Item.update({
    _id: req.body.item_id
  }, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag
    }
  }, (err, output) => {
    if (err) console.error(err)
    res.redirect('/')
  })
}

module.exports = {
  createItem: createItem,
  itemList: itemList,
  removeItem: removeItem,
  editItem: editItem
}
