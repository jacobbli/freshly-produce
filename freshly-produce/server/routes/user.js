var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');

/* GET users */
router.post('/login', userController.getUser);


// POST new user
router.post('/', userController.addUser);

// GET all products bought by a user
router.get('/products', userController.getPurchasedProducts);

// GET all products being sold by a user
router.get('/products/offered', userController.getOfferedProducts);

// POST new product
router.post('/products', userController.addSubscription);

// publish product api
router.patch('/products/publish', userController.publishProduct);
router.patch('/products/unpublish', userController.unpublishProduct);

module.exports = router;
