let productModel = require('../model/product-model');

addProduct = (req,res)=>{
    let p_product_type = req.body.product_type;
    let p_product_name = req.body.product_name;
    let p_product_price = parseInt(req.body.product_price);
    let p_unit = req.body.unit;
    let p_quantity = req.body.quantity;
    let p_expiration_date = req.body.expiration_date;
    let p_user_id = req.body.user_id;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-'+ mm + '-' + dd ;
    
    //formate to object
    let iOject = {
        product_type: p_product_type,
        product_name: p_product_name,
        product_price: p_product_price,
        unit: p_unit,
        quantity: p_quantity,
        expiration_date: p_expiration_date,
        user_id: 1,
    }
    let sql = `INSERT INTO products (seller_id, product_photo, product_name, product_type, product_price, product_description, is_published, unit, quantity, frequency, delivery_day, expiration_date, created_at, is_deleted) values(3,null,'${p_product_name}', '${p_product_type}', ${p_product_price},'',false,'${p_unit}',${p_quantity},'','','${p_expiration_date}','${today}', false)`

    //add to model
    productModel.add(sql);
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
    getProducts,
    deleteProduct,
    addProduct,
  }