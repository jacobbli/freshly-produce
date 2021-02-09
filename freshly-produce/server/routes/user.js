var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');

/* GET users */
router.post('/login', userController.getUser);


// POST new user
router.post('/', userController.addUser);

// GET all products owned by a user
router.get('/products', userController.getProducts);

// POST new product
router.post('/products', userController.addProduct);


module.exports = router;
