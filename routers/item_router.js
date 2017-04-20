var express = require('express');
var router = express.Router();
var itemController = require('../controllers/item_controller')

router.get('/homepage', itemController.itemList)

router.get('/create', function(req, res) {
  res.render('item/create');
});

router.post('/item/delete', itemController.removeItem)

router.post('/item/edit', itemController.editItem)

router.post('/create', itemController.createItem)

// router.post('/homepage', itemController.searchItem)

router.get('/item/:itemId/edit', itemController.editItemPage)

module.exports = router
