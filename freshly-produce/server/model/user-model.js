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

async function getOrders(orderArgs) {
  try {
    const query = `SELECT * FROM orders WHERE buyer_id = $1 AND order_type = $2 AND is_deleted = $3;`;
    const res = await db.query(query, orderArgs);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

async function getProducts(productArgs) {
  try {
    const query = `SELECT * FROM products WHERE seller_id = $1 AND product_type = $2 AND is_deleted = false;;`;
    const res = await db.query(query, productArgs);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

async function insertProduct(args){
  try {
    const query = `INSERT INTO products (seller_id, product_photo, product_name, product_type, product_price, product_description, unit, quantity, frequency, delivery_day, is_published, is_deleted, created_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`;
    const res = await db.query(query, args);

    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

async function addUser(args) {
  try {
    const query = `INSERT INTO users (username, password, first_name, surname, role, phone, email, address, user_photo, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);`;
    const res = await db.query(query, args);

    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function publishProduct(args) {
  try {
    const query = `UPDATE products SET is_published = true WHERE product_id = $1;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function unpublishProduct(args) {
  try {
    const query = `UPDATE products SET is_published = false WHERE product_id = $1;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

module.exports = {
  getUser,
  getProducts,
  getOrders,
  addUser,
  insertProduct,
  publishProduct,
  unpublishProduct,
}