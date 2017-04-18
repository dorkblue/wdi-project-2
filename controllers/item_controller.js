let Item = require('../models/item')

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

module.exports = {
  itemList: itemList,
  removeItem: removeItem,
  editItem: editItem
}
