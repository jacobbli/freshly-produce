const axios = require('axios').default;

/* Customer */
export async function getSubscribedProducts(reqObject) {
  try {
    let products = []
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription`;
    let response = await axios.get(apiUrl, {
      params: reqObject
    });
    if (response.status == 200) {
      products = response.data;
    }
    return products;
  } catch(error) {
    return error;
  }
}

/* Customer */
export async function getAvailableSubscriptions(reqObject) {
  try {
    let products = []
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/available-subscriptions`;
    let response = await axios.get(apiUrl, {
      params: reqObject
    });
    if (response.status == 200) {
      products = response.data;
    }
    return products;
  } catch(error) {
    return error;
  }
}

export async function subscribe(reqObject) {
  try {
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription`;
    let response = await axios.post(apiUrl, reqObject);
    return response.headers;
  } catch(error) {
    return error;
  }
}

export async function unsubscribe(order_id) {
  try {
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/${order_id}`;
    let response = await axios.delete(apiUrl);
    return Promise.resolve(response.data);
  } catch(error) {
    return error;
  }
}

/* Vendor */
export async function getOfferedSubscriptions(reqObject) {
  try {
    let products = []
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/my-offers`;
    let response = await axios.get(apiUrl, {
      params: reqObject
    });
    if (response.status == 200) {
      products = response.data;
    }
    return products;
  } catch(error) {
    return error;
  }
}

export async function createNewSubscription(productObject) {
  try {
    var productForm = new FormData();
    for ( var key in productObject ) {
      productForm.append(key, productObject[key]);
    }
    productForm.set('user_id', JSON.parse(sessionStorage.getItem('currentUser')).user_id);
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/my-offers`;
    let response = await axios.post(apiUrl, productForm, {
      headers: {'Content-Type': 'multipart/form-data'},
    });
    return response.data;
  } catch(error) {
    return error;
  }
}

export async function setPublishedStatus(product_id) {
  try {
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/my-offers/is-published/${product_id}`;
    let response = await axios.patch(apiUrl);
    return response.data;
  } catch(error) {
    return error;
  }
}

export async function deleteSubscription(product_id) {
  try {
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/subscription/my-offers/${product_id}`;
    let response = await axios.delete(apiUrl);
    return Promise.resolve(response.data);
  } catch(error) {
    return error;
  }
}