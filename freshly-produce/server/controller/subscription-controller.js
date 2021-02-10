let subscriptionModel = require('../model/subscription-model');

async function subscribe(request, response) {
  try {
    const productArg = [request.body.product_id]
    const products = await subscriptionModel.getProducts(productArg);
    const seller_id = products[0].seller_id;
    const created_at = new Date();
    const transactionArg = [
      request.body.user_id,
      seller_id,
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
      requset.body.transaction_cost,
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
    cancelArgs = [request.body.order_id]
    const res = await subscriptionModel.deleteOrder(cancelArgs);
    response.status(200).end();
  } catch (error) {
    console.error(error)
    response.status(404).end();
  }
}

async function getSubscribedProducts(request, response) {
  try {
    const orderArgs = [request.query.user_id, request.query.product_type];
    const subscribedProducts = await subscriptionModel.getActiveSubscriptions(orderArgs);
    console.log(subscribedProducts)
    response.json(subscribedProducts);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}


module.exports = {
  subscribe,
  cancelSubscription,
  getSubscribedProducts
}