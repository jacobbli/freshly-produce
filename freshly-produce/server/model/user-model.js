let db = require('../db/db');

async function getUser(user_id) {
  try {
    const query = `SELECT user_id, password, username, first_name, surname, role, phone, email, address FROM users WHERE users.username = $1;`;
    const args = [user_id];

    const res = await db.query(query, args);
    return Promise.resolve(res.rows);
  } catch (error) {
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

module.exports = {
  getUser,
  addUser
}