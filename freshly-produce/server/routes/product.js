const express = require('express');
const productController = require('../controller/product-controller');
const router = express.Router();

router.post('/add',productController.addProduct);
router.get('/',productController.getProducts);

router.delete('/',productController.deleteProduct);

module.exports = router;