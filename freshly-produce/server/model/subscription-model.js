let db = require('../db/db');

async function insertTransaction(args) {
  try {
    const query = `INSERT INTO transactions (buyer_id, seller_id, transaction_cost, created_at)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error);
    return Promise.resolve(error);
  }
}

async function insertOrder(args) {
  try {
    const query = `INSERT INTO orders (buyer_id, transaction_id, product_id, order_quantity, order_type, order_cost, is_deleted, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error);
    return Promise.resolve(error);
  }
}

async function getProducts(args) {
  try {
    const query = `SELECT * FROM products WHERE product_id = $1 AND is_deleted = false;;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error);
    return Promise.resolve(error);
  }
}

async function deleteOrder(args) {
  try {
    const query = `UPDATE orders SET is_deleted = true WHERE order_id = $1;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

async function getOrders(args) {
  try {
    const query = `SELECT * FROM orders WHERE buyer_id = $1 AND order_type = $2;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

async function getActiveSubscriptions(args) {
  try {
    const query = `SELECT * FROM orders WHERE buyer_id = $1 AND order_type = $2 AND is_deleted = false;`;
    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    console.error(error)
    return Promise.resolve(error);
  }
}

module.exports = {
  insertTransaction,
  insertOrder,
  getProducts,
  deleteOrder,
  getOrders,
  getActiveSubscriptions
}