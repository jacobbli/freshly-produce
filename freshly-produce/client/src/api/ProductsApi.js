import axios from "axios"

  
export default {
    addProduct: function(data) {
        axios.post("http://localhost:8086/product/add",data).then(()=>{
            this.$toast.add({severity:'success', summary: 'Submited!', life: 3000,});
            this.$router.push({ name: 'HomePage' });
        });
    }
}