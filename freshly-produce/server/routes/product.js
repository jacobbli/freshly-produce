const express = require('express');
const productController = require('../controller/product-controller');
const router = express.Router();

router.post('/add',productController.addProduct);
router.get('/',productController.getProducts);
router.get('/discountProducts',productController.getDiscountProducts);
router.get('/myDiscountProducts',productController.getMyDiscountProducts);

router.delete('/',productController.deleteProduct);

module.exports = router;