let userModel = require('../model/user-model');
const bcrypt = require('bcrypt');
const { end } = require('../db/db');


async function getUser(request, response) {
  try { 
    
    let res = await userModel.getUser(request.body.username);
    if (!request.body.password && !res[0].password) {
      return Promise.reject(response.status(403).end());
    }
    const match = await bcrypt.compare(request.body.password, res[0].password);
    if (match) {
      return Promise.resolve(response.json(res[0]));
    } else {
      return Promise.reject(response.status(403).end());
    }
  } catch(error) {
    return Promise.reject(error);
  }
}

function getProducts(request, response) {
  userModel.getProducts(request.body.user_id, request.body.product_type).then(res => {
    response.json(res);
  }).catch(error => {
    console.error(error)
  });  
}

async function addUser(request, response) {
  try {
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const userObject = {
      username: request.body.username,
      password: passwordHash,
      first_name: request.body.first_name,
      surname: request.body.surname,
      role: request.body.role,
      phone: request.body.phone,
      email: request.body.email,
      address: request.body.address,
      photo: request.body.photo
    }
    userModel.addUser(userObject).then(res => {
      return Promise.resolve(response.json(res));
    })
  } catch(error) {
    return Promise.reject(error);
  }
}

module.exports = {
  getUser: getUser,
  getProducts: getProducts,
  addUser: addUser
}