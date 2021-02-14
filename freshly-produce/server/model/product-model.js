let db = require('../db/db');

async function addProduct(args){
  try{
    const query = `INSERT INTO products (seller_id, product_photo, product_name, product_type, product_price, product_description, is_published, unit, quantity, frequency, delivery_day, expiration_date, created_at, is_deleted) values($1, $9, $2, $3, $4,'',false,$5,$6,'','',$7,$8, false)`
    const res = await db.query(query,args);
    return Promise.resolve(res.rows);
  }catch(error){
    console.log(error);
  }   
}

async function getProducts(product_type) {
  try {
    const query = `SELECT * FROM products WHERE product_type = $1 AND is_published = true AND is_deleted = false;`;
    const args = [product_type];
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function getDiscountProducts() {
  try {
    const query = `SELECT * FROM products WHERE expiration_date IS NOT NULL AND is_deleted = false AND is_published = true;`;
    const res = await db.query(query);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function getMyDiscountProducts(args) {
  try {
    const query = `SELECT * FROM products WHERE expiration_date IS NOT NULL AND is_deleted = false AND seller_id =$1;`;
    const res = await db.query(query,args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function deleteProduct(args) {
  try {
    const query = `UPDATE products SET is_deleted = true, is_published = false WHERE product_id = $1;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}
async function updateProduct(args){
  try {
    const query =
    `UPDATE products SET
    product_photo = $1,
    product_name = $2,
    product_price = $3,
    product_description = $4,
    unit = $5,
    quantity = $6,
    expiration_date = $7
    WHERE product_id = $8`;

    const res = await db.query(query, args);

    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}


module.exports = {
    add : addProduct,
    getProducts,
    deleteProduct,
    getDiscountProducts,
    getMyDiscountProducts,
    updateProduct
    // addExpiry : addCloseToExpiryProduct,
}