const express = require('express');
const productontroller = require('../controller/product-controller');
const router = express.Router();

router.post('/product/add',produceController.addItem);