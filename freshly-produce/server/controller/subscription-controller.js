let subscriptionModel = require('../model/subscription-model');
const formidable = require('formidable');

/* Customer */
async function subscribe(request, response) {
  try {
    const created_at = new Date();
    const transactionArg = [
      request.body.user_id,
      request.body.seller_id,
      request.body.transaction_cost,
      created_at,
    ];
    // TODO: create sql trigger to update transaction table?
    const insertedTransaction = await subscriptionModel.insertTransaction(transactionArg)
    const orderArg = [
      request.body.user_id,
      insertedTransaction[0].transaction_id,
      request.body.product_id,
      request.body.product_quantity,
      request.body.product_type,
      request.body.transaction_cost,
      false,
      created_at,
      ];
      const res = await subscriptionModel.insertOrder(orderArg)
      response.json(res);
    
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

async function cancelSubscription(request, response) {
  try {
    queryArgs = [request.params.order_id]
    const res = await subscriptionModel.deleteOrder(queryArgs);
    response.status(200).end();
  } catch (error) {
    console.error(error)
    response.status(404).end();
  }
}

async function getSubscribedProducts(request, response) {
  try {
    const queryArgs = [request.query.user_id, request.query.product_type];
    const subscribedProducts = await subscriptionModel.getActiveSubscriptions(queryArgs);
    response.json(subscribedProducts);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

async function getAvailableSubscriptions(request, response) {
  try {
    let queryArgs = [request.query.product_type];
    let availableSubscriptions = await subscriptionModel.getProducts(queryArgs);

    queryArgs = [request.query.user_id, request.query.product_type]
    const activeSubscriptions = await subscriptionModel.getActiveSubscriptions(queryArgs);

    availableSubscriptions.forEach(avail => {
      activeSubscriptions.forEach(active => {
        if (avail.product_id === active.product_id) {
          avail.is_subscribed = true;
        } else {
          avail.is_subscribed = false;
        }
      })
    })
    response.json(availableSubscriptions);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}


/* Vendor */
function createNewSubscription(request, response) {
  const form = formidable();
  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      response.status(404).end();
    }
    const created_at = new Date();
    const queryArgs = [
      fields.user_id,
      files.product_photo,
      fields.product_name,
      fields.product_type,
      fields.product_price,
      fields.product_description,
      fields.unit,
      fields.quantity,
      fields.frequency,
      fields.delivery_day,
      false,
      false,
      created_at
    ]
    subscriptionModel.insertProduct(queryArgs).then(res => {
      response.json(res);
    }).catch(error => {
      console.error(error)
      response.status(404).end();
    });
  });
}

async function deleteSubscription(request, response) {
  try {
    const deleteArg = [request.query.product_id];
    const res = await productModel.deleteSubscription(deleteArg);
    response.json(res);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

async function setSubscriptionPublishStatus(request, response) {
  try {
    const queryArgs = [request.params.product_id];
    const res = await subscriptionModel.setSubscriptionPublishStatus(queryArgs);
    response.json(res);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}


async function getOfferedSubscriptions(request, response) {
  try {
    const queryArgs = [request.query.user_id, request.query.product_type];
    const res = await subscriptionModel.getOfferedSubscriptions(queryArgs);
    response.json(res);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

module.exports = {
  getAvailableSubscriptions, // customer
  subscribe, // customer
  cancelSubscription, // customer
  getSubscribedProducts, // customer
  createNewSubscription, // vendor
  deleteSubscription, // vendor
  getOfferedSubscriptions, // Vendor
  setSubscriptionPublishStatus // Vendor
}