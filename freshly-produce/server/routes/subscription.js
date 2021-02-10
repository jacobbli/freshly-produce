var express = require('express');
var router = express.Router();

const subscriptionController = require('../controller/subscription-controller');
require('dotenv').config();

/* Subscribe to a product */
router.post('/', subscriptionController.subscribe);

/* Cancel to a product */
router.patch('/', subscriptionController.cancelSubscription);

/* Get subscribed products */
router.get('/', subscriptionController.getSubscribedProducts);

module.exports = router;
