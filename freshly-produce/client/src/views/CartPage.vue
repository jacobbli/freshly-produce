<template>
    <div class="p-grid">
        <DataView class="p-pt-4 p-pl-4 p-col-8" :value="myCart" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
            <template #list="slotProps">
                <div class="p-col-12">
                    <div class="product-list-item">
                        <div class="p-grid">
                            <img class="p-col-4 p-mt-2" :src="slotProps.data.product_photo" :alt="'user header'"/>
                            <div class="product-list-detail p-col-4 p-mx-4">
                                <div class="product-name"><h4>{{slotProps.data.product_name}}</h4></div>
                                <div class="product-description">Expiry date: {{slotProps.data.expiration_date}}</div>
                                <i class="pi pi-tag product-category-icon"></i><span class="product-category p-pl-2"> {{slotProps.data.product_category}}</span>
                            </div>
                            <div class="product-list-action p-col-4">
                                <h3 class="product-price p-col-12">${{slotProps.data.product_price}}</h3>
                               <Button icon="pi pi-times-circle" @click="openConfirmationModal(slotProps.data, 'delete')" label=" Delete" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
        <div class="p-col-4 p-pt-4">
            <h1>Total Cost:</h1>
            <h2>${{this.totalCost}}</h2>
            <Button icon="pi pi-check-circle" label="Check Out" @click="checkOutOrders" ></Button>
        </div>

    </div>
</template>
<script>
import {  computed } from "vue";
export default {
    mounted() {
        if(this.myCart != null){
            this.myCart = JSON.parse(localStorage.getItem('myCart'));
        }else{
            localStorage.setItem('myCart',JSON.stringify(this.myCart));
        }
    },

   methods: {
       checkOutOrders(){
           this.$toast.add({severity:'success', summary: 'Purchased!', life: 3000,});
           this.$router.push({ name: 'DiscountedProduce' });
           let cart = []
           localStorage.setItem('myCart',JSON.stringify(cart));
       },
       openConfirmationModal(product, task) {
            this.selectedProduct = product;
            this.selectedTask = task;
            this.$toast.add({severity:'info', summary: 'Removed!', life: 3000,});          

            this.myCart = this.myCart.filter(e => e !== product)
            localStorage.setItem('myCart',JSON.stringify(this.myCart));

        },
   },
   
    data() {
		return {
            confirmationModalIsVisible: false,
            myCart: [],
            totalCost: computed(()=>{
                let sum = 0;
                
                    this.myCart.forEach((item) =>{
                        sum += parseInt(item.product_price)
                    })
                

                return sum
                
            }),
            layout: 'list',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            selectedProduct: null,
            
            sortOptions: [
                {label: 'Price High to Low', value: '!product_price'},
                {label: 'Price Low to High', value: 'product_price'},
            ],
            
        }
    }
}
</script>
<style>
    .product-list-item img{
        height: 150px;
        width: 225px;
    }
</style>