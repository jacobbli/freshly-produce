let db = require('../db/db');

async function getUser(user_id) {
  try {
    const query = `SELECT * FROM users WHERE users.username = $1;`;
    const args = [user_id];

    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function getProducts(user_id, product_type) {
  try {
    const query = `SELECT * FROM products WHERE product_type = $1 AND user_id = $2;`;
    const args = [product_type, user_id];
    const res = await db.query(query, args);
    console.log(res.rows)
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function addProduct(args){
  try {
    const query = `INSERT INTO products (user_id, product_name, product_description, product_type, product_price, unit, quantity, frequency, delivery_day, photo, is_published)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
    const res = await db.query(query, args);

    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}


async function addUser(args) {
  try {
    const query = `INSERT INTO users (username, password, first_name, surname, role, phone, email, address, photo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;


    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

module.exports = {
  getUser: getUser,
  getProducts: getProducts,
  addUser: addUser,
  addProduct: addProduct
}