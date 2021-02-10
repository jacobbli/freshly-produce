let db = require('../db/db');

function addProduct(obj){
    let sql = "INSERT INTO products (product_name, product_type, product_price, unit, quantity, expiration_date, user_id) values ('"+ obj.product_name +"','"+  obj.product_type +"',"+ obj.product_price +",'" +obj.unit+"',"+ obj.quantity + ",'"+ obj.expiration_date + "'," + obj.user_id + ")"
   
    return db.query(sql);
}

async function getProducts(product_type) {
    try {
      const query = `SELECT * FROM products WHERE product_type = $1 AND is_published = true;`;
      const args = [product_type];
      const res = await db.query(query, args);
      console.log(res.rows)
      return Promise.resolve(res.rows);
    } catch (error) {
      return Promise.resolve(error);
    }
}


module.exports = {
    add : addProduct,
    // addExpiry : addCloseToExpiryProduct,
    getProducts
}