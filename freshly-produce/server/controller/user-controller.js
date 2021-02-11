let userModel = require('../model/user-model');
const bcrypt = require('bcrypt');

async function getUser(request, response) {
  try {
    let res = await userModel.getUser(request.body.username);
    if (!request.body.password && !res[0].password) {
      return Promise.reject(response.status(403).end());
    }
    const match = await bcrypt.compare(request.body.password, res[0].password);
    if (match) {
      delete res[0].password;
      return Promise.resolve(response.json(res[0]));
    } else {
      return Promise.reject(response.status(403).end());
    }
  } catch(error) {
    return Promise.reject(error);
  }
}

async function addUser(request, response) {
  try {
    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const created_at = new Date();
    const args = [
      request.body.username,
      passwordHash,
      request.body.first_name,
      request.body.surname,
      request.body.role,
      request.body.phone,
      request.body.email,
      request.body.address,
      request.body.user_photo,
      created_at
    ];
    userModel.addUser(args).then(res => {
      return Promise.resolve(response.json(res));
    }).catch(error => {
      console.error(error)
      return Promise.reject(response.status(404).end());
    })
  } catch(error) {
    console.error(error)
    return Promise.reject(response.status(404).end());
  }
}

module.exports = {
  getUser,
  addUser
}