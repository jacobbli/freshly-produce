const axios = require('axios').default;
  
export default {
    addProduct:async function(data) {
        let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product/add`;
        await axios.post(endpointUrl,data).then((res)=>{
          console.log(res)
          return  Promise.resolve(res.data);
        }).catch((err) => {
          console.log(err) 
        });
    }
}

// export async function getDiscountedProducts() {
//   try {
//     let products = []
//     let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product/discountProducts`;
//     let response = await axios.get(endpointUrl);

//     if (response.status == 200) {
//       products = response.data;
//     }
//     return products;
//   } catch(error) {
//     return error;
//   }
// }

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
