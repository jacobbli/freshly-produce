let productModel = require('../model/product-model');

async function addProduct (req,res){
  try {
    let p_product_type = req.body.product_type;
    let p_product_name = req.body.product_name;
    let p_product_price = parseInt(req.body.product_price);
    let p_unit = req.body.unit;
    let p_quantity = req.body.quantity;
    let p_expiration_date = req.body.expiration_date;
    let p_user_id = req.body.user_id;
    let p_product_photo = req.body.product_photo;
    let p_product_category = req.body.product_category;
    let p_product_description = req.body.product_description;

    var today = new Date();

    today = new Date();

    const arg = [
      p_user_id,
      p_product_photo,
      p_product_name,
      p_product_type,
      p_product_price,
      p_product_description,
      p_product_category,
      p_unit,
      p_quantity,
      p_expiration_date,
      today
    ]

    //add to model
    const data = await productModel.add(arg);
    res.json(data);
  }catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

function getDiscountProducts(request, response) {
  productModel.getDiscountProducts(request.query.product_type).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

async function getMyDiscountProducts(request, response) {
  try{
    const userIDArg = [request.query.user_id];
    const res = await productModel.getMyDiscountProducts(userIDArg);
    response.json(res);
  }catch(err){
    console.error(error)
    response.status(404).end();
  }
  
}

function getProducts(request, response) {
    productModel.getProducts(request.query.product_type).then(res => {
      response.json(res);
    }).catch(error => {
      console.error(error)
      response.status(404).end();
    });
}

async function deleteProduct(request, response) {
  try {
    const deleteArg = [request.query.product_id];
    const res = await productModel.deleteProduct(deleteArg);
    response.json(res);
  } catch(error) {
    console.error(error)
    response.status(404).end();
  }
}

function updateDiscount(request, response) {

  const queryArgs = [
    request.body.product_photo,
    request.body.product_name,
    request.body.product_price,
    request.body.product_description,
    request.body.product_category,
    request.body.unit,
    request.body.quantity,
    request.body.expiration_date,
    request.body.product_id,
  ]
  productModel.updateProduct(queryArgs).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
    response.status(404).end();
  });
}

module.exports = {
    getProducts,
    deleteProduct,
    addProduct,
    getDiscountProducts,
    getMyDiscountProducts,
    updateDiscount
  }