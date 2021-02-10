const axios = require('axios').default;

export async function getSubscribedProducts(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/subscription`;
    let response = await axios.get(endpointUrl, {
      params: reqObject
    });
    if (response.status == 200) {
      console.log(response.data);
      return Promise.resolve(response.data);
    }
    Promise.resolve('Request failed')
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function subscribe(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/subscription`;
    let response = await axios.post(endpointUrl, reqObject);
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}

export async function unsubscribe(reqObject) {
  try {
    let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/subscription`;
    let response = await axios.patch(endpointUrl, reqObject);
    return Promise.resolve(response.data);
  } catch(err) {
    return Promise.reject('Request failed');
  }
}
