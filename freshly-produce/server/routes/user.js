var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');

/* GET users */
router.post('/login', userController.getUser);

// GET all products owned by a user
router.get('/products', userController.getProducts);

// POST new user
router.post('/', userController.addUser);

module.exports = router;
