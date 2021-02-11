var express = require('express');
var router = express.Router();

const userController = require('../controller/user-controller');

/* GET users */
router.post('/login', userController.getUser);


// POST new user
router.post('/', userController.addUser);


module.exports = router;
