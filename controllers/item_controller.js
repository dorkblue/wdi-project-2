let Item = require('../models/item')

function itemList(req, res) {
  Item.find({ user_id: req.user._id }, (err, output) => {
    if (err) res.send(err)
    // console.log(output)
    res.render('index', {
      allItems: output,
      userName: req.user.username
    })
  })
}

// function findItem(req, res) {
//   Item.find( { tag: req.body.search , user_id: req.user._id }, (err, output) => {
//     if (err) res.send(err)
//     res.render('index', {
//       foundItems: output
//     })
//   })
// }

module.exports = {
  itemList: itemList
}
