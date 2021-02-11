var express = require('express');
var router = express.Router();

const subscriptionController = require('../controller/subscription-controller');

// Customer
/* Get subscribed products */
router.get('/', subscriptionController.getSubscribedProducts);

/* Get subscribed products */
router.get('/available-subscriptions', subscriptionController.getAvailableSubscriptions);

/* Subscribe to a product */
router.post('/', subscriptionController.subscribe);

/* Cancel subscription */
router.delete('/:order_id', subscriptionController.cancelSubscription);


// Vendor
/* Get offered subscriptions */
router.get('/my-offers', subscriptionController.getOfferedSubscriptions);

/*Create new subscription */
router.post('/my-offers', subscriptionController.createNewSubscription);

/* Delete subscription */
router.delete('/my-offers/:product_id', subscriptionController.deleteSubscription);

/* Update is_published status of subscription */
router.patch('/my-offers/is-published/:product_id', subscriptionController.setSubscriptionPublishStatus);

module.exports = router;
