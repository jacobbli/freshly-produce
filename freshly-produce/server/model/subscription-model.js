let db = require('../db/db');

async function insertTransaction(args) {
  try {
    const query = `INSERT INTO transactions (buyer_id, seller_id, transaction_cost, created_at)
    VALUES ($1, $2, $3, $4) RETURNING *;`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function insertOrder(args) {
  try {
    const query = `INSERT INTO orders (buyer_id, transaction_id, product_id, order_quantity, order_type, product_price, is_deleted, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getProducts(args) {
  try {
    const query = `SELECT * FROM products WHERE product_type = $1 AND is_deleted = false AND is_published = true;`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function deleteOrder(args) {
  try {
    const query = `UPDATE orders SET is_deleted = true WHERE order_id = $1;`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}

async function getOrders(args) {
  try {
    const query = `SELECT * FROM orders WHERE buyer_id = $1 AND order_type = $2;`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}

async function getActiveSubscriptions(args) {
  try {
    const query =
    `SELECT O.order_id, P.product_photo, P.product_name, P.product_price, P.product_description, P.unit, P.quantity, P.frequency, P.delivery_day
      FROM orders O, products P
      WHERE O.buyer_id = $1 AND O.order_type = $2 AND O.is_deleted = false and O.product_id = P.product_id;`;

    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}

async function insertProduct(args){
  try {
    const query =
    `INSERT INTO products (seller_id, product_photo, product_name, product_type, product_price, product_description, unit, quantity, frequency, delivery_day, is_published, is_deleted, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`;
    const res = await db.query(query, args);

    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
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
    frequency = $7,
    delivery_day = $8
    WHERE product_id = $9`;

    const res = await db.query(query, args);

    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}

async function getOfferedSubscriptions(args) {
  try {
    const query =
    `SELECT product_id, product_photo, product_name, product_price, product_description, unit, quantity, frequency, delivery_day, is_published
    FROM products
    WHERE seller_id = $1 AND product_type = $2 AND is_deleted = false;`;

    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    console.error(error)
    return error;
  }
}

async function setSubscriptionPublishStatus(args) {
  try {
    const query = `UPDATE products SET is_published = NOT is_published WHERE product_id = $1;`;
    const res = await db.query(query, args);
    return res.rows;
  } catch (error) {
    return error;
  }
}

async function deleteSubscription(args) {
  try {
    const query = `UPDATE products SET is_deleted = true, is_published = false WHERE product_id = $1;`;
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
  getActiveSubscriptions,
  insertProduct,
  getOfferedSubscriptions,
  setSubscriptionPublishStatus,
  deleteSubscription,
  updateProduct
}