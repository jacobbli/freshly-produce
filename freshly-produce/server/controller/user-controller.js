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

function getProducts(request, response) {
  userModel.getProducts(request.query.user_id, request.query.product_type).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

function addProduct(request, response) {
  const form = formidable();
  form.parse(request, (err, fields, files) => {
    if (err) {
      next(err);
      response.status(404).end();
    }
    const arg = [
      fields.user_id,
      fields.product_name,
      fields.product_description,
      fields.product_type,
      fields.product_price,
      fields.unit,
      fields.quantity,
      fields.frequency,
      fields.delivery_day,
      files.photo,
      false
    ]
    userModel.addProduct(arg).then(res => {
      response.json(res);
    }).catch(error => {
      console.error(error)
      response.status(404).end();
    });
  });
}

async function addUser(request, response) {
  try {
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const args = [
      request.body.username,
      passwordHash,
      request.body.password,
      request.body.first_name,
      request.body.surname,
      request.body.role,
      request.body.phone,
      request.body.email,
      request.body.address,
      request.body.photo,
    ];
    userModel.addUser(args).then(res => {
      return Promise.resolve(response.json(res));
    })
  } catch(error) {
    console.error(error)
    return Promise.reject(response.status(404).end());
  }
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

module.exports = {
  getUser,
  getProducts,
  addUser,
  addProduct,
  publishProduct,
  unpublishProduct
}