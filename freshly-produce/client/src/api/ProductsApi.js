

  
export default {
    addProduct: function(data) {
        let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product/add`;
        axios.post(endpointUrl,data).then(()=>{
            this.$toast.add({severity:'success', summary: 'Submited!', life: 3000,});
            this.$router.push({ name: 'HomePage' });
        });
    }
}

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
