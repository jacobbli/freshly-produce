import axios from "axios"

  
export default {
    addProduct: function(data) {
        let endpointUrl = `${process.env.VUE_APP_ROOT_URL}/product/add`;
        console.log(endpointUrl)
        axios.post("http://localhost:3000/product/add",data).then(()=>{
            this.$toast.add({severity:'success', summary: 'Submited!', life: 3000,});
            this.$router.push({ name: 'HomePage' });
        });
    }
}