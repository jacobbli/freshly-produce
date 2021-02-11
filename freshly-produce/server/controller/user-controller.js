let userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const formidable = require('formidable');

async function getUser(request, response) {
  try {
    let res = await userModel.getUser(request.body.username);
    if (!request.body.password && !res[0].password) {
      return Promise.reject(response.status(403).end());
    }
    const match = await bcrypt.compare(request.body.password, res[0].password);
    if (match) {
      return Promise.resolve(response.json(res[0]));
    } else {
      return Promise.reject(response.status(403).end());
    }
  } catch(error) {
    return Promise.reject(error);
  }
}

async function addUser(request, response) {
  try {
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const created_at = new Date();
    const args = [
      request.body.username,
      passwordHash,
      request.body.first_name,
      request.body.surname,
      request.body.role,
      request.body.phone,
      request.body.email,
      request.body.address,
      request.body.user_photo,
      created_at
    ];
    userModel.addUser(args).then(res => {
      return Promise.resolve(response.json(res));
    }).catch(error => {
      console.error(error)
      return Promise.reject(response.status(404).end());
    })
  } catch(error) {
    console.error(error)
    return Promise.reject(response.status(404).end());
  }
}


async function getPurchasedProducts(request, response) {
  try {
    const orderArgs = [request.query.user_id, request.query.product_type, false];
    const orders = await userModel.getOrders(orderArgs);

    if (orders.length > 0) {
      const productArgs = [request.query.user_id, request.query.product_type];
      const products = await userModel.getProducts(productArgs);

      if(products.length > 0) {
        response.json(products);
      }
    }
    response.json([]);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

async function getOfferedProducts(request, response) {
  try {
    if (request.query.user_id && request.query.product_type) {
      const productArgs = [request.query.user_id, request.query.product_type];
      const products = await userModel.getProducts(productArgs);
      response.json(products);
    } else {
      response.status(404).end();
    }
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

function addSubscription(request, response) {
  const form = formidable();
  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      response.status(404).end();
    }
    const created_at = new Date();
    const arg = [
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
    userModel.insertProduct(arg).then(res => {
      response.json(res);
    }).catch(error => {
      console.error(error)
      response.status(404).end();
    });
  });
}

function publishProduct(request, response) {
  const args = [request.body.product_id];
  userModel.publishProduct(args).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

function unpublishProduct(request, response) {
  const args = [request.body.product_id];
  userModel.unpublishProduct(args).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

function subscribe(request, response) {
  const created_at = new Date();
  const arg = [
    request.body.transaction_cost,
    created_at,
    request.body.user_id,
    false
  ]
  // TODO: create sql trigger to update transaction table?
  userModel.insertTransaction(arg).then(res => {
    orderArg = [
      request.body.product_price,
      request.body.product_quantity,
      created_at,
      request.body.user_id,
      res.transaction_id,
      request.body.product_id,
      request.body.product_type,
      false
    ];
    userModel.insertOrder(orderArg).then(() => {
      response.json(res);
    })
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

function unsubscribe(request, response) {
  const arg = [
    request.body.user_id,
    request.body.product_id
  ]
  userModel.unsubscribe(arg).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

module.exports = {
  getUser,
  getPurchasedProducts,
  getOfferedProducts,
  addUser,
  addSubscription,
  publishProduct,
  unpublishProduct,
  unsubscribe
}