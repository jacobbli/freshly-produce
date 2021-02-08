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
    const args = [request.body.product_type, request.body.user_id];

    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

async function addUser(userObject) {
  try {
    const query = `INSERT INTO users (username, password, first_name, surname, role, phone, email, address, photo)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    
    const args = [
      userObject.username,
      userObject.password,
      userObject.first_name,
      userObject.surname,
      userObject.role,
      userObject.phone,
      userObject.email,
      userObject.address,
      userObject.photo,
    ];

    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
    return Promise.resolve(error);
  }
}

module.exports = {
  getUser: getUser,
  getProducts: getProducts,
  addUser: addUser
}