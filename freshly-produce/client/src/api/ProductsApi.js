const axios = require('axios').default;

export async function getProducts(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product`;
    let response = await axios.get(endpointUrl, {
      params: reqObject,
    });
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function deleteProduct(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product`;
    let response = await axios.delete(endpointUrl, {
      params: reqObject
    });
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}
