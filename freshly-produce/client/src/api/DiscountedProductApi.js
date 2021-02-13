const axios = require('axios').default;

/* Vendor */
export async function getDiscountedProducts() {
  try {
    let products = []
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/product/discountProducts`;
    let response = await axios.get(apiUrl);
    if (response.status == 200) {
      products = response.data;
    }
      return products;
    } catch(error) {
      return error;
    }
}


export async function getMyDiscountedProducts(reqObject) {
  try {
    let products = []
    let apiUrl = `${process.env.VUE_APP_ROOT_URL}/product/myDiscountProducts`;
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