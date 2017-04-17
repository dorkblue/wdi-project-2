var mongoose = require('mongoose')

var itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Item must have a title']
  },
  url: {
    type: String
  },
  description: {
    type: String
  },
  imageurl: {
    type: String
  },
  tag: {
    type: String
  },
  user_id: {
    type: String,
    index: true
  }
})

var Item = mongoose.model('Item', itemSchema)
module.exports = Item
