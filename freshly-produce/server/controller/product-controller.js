let productModel = require('../model/product-model');

addItem = (req,res)=>{
    let p_product_type = req.body.product_type;
    let p_product_name = req.body.product_name;
    let p_product_price = req.body.product_price;
    let p_unit = req.body.unit;
    let p_quantity = req.body.quantity;
    let p_user_id = req.body.user_id;


    //formate to object
    let iOject = {
        product_type: p_product_type,
        product_name: p_product_name,
        product_price: p_product_price,
        unit: p_unit,
        quantity: p_quantity,
        user_id: 1,
    }

    //add to model
    productModel.add(iOject);
    res.json(req.body);
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

module.exports = {
    addItem,
    getProducts,
    deleteProduct
  }