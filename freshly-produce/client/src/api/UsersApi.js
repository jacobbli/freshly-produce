const axios = require('axios').default;

export async function login(loginObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/login`;
    let response = await axios.post(endpointUrl, loginObject, {
      headers: {'Content-Type': 'application/json'},
    });
    sessionStorage.setItem('currentUser', JSON.stringify(response.data));
    return Promise.resolve('Successful request');
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function getProducts(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/products/offered`;
    let response = await axios.get(endpointUrl, {
      params: reqObject
    });
    if (response.status == 200) {
      return Promise.resolve(response.data);
    }
    Promise.resolve('Request failed')
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

