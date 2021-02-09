import store from '../store/store';

const axios = require('axios').default;

export async function login(loginObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/login`;
    let response = await axios.post(endpointUrl, loginObject, {
      headers: {'Content-Type': 'application/json' },
    });

    store.dispatch('users/setUser', response.data)
    return Promise.resolve('Successful request');
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function getProducts(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/products`;
    let response = await axios.get(endpointUrl, {
      params: reqObject
    });
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function addProduct(productObject) {
  try {
    var productForm = new FormData();
    for ( var key in productObject ) {
      productForm.append(key, productObject[key]);
    }
    productObject['user_id'] = store.getters['users/getUserId'];
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/products`;
    let response = await axios.post(endpointUrl, productForm, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function publishProduct(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/products/publish`;
    let response = await axios.patch(endpointUrl, reqObject);
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function unpublishProduct(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/user/products/unpublish`;
    let response = await axios.patch(endpointUrl, reqObject);
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}