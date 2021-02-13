<template>
    <div class="p-grid">
        <DataView class="p-pt-4 p-pl-4 p-col-8" :value="myCart" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
            <template #list="slotProps">
                <div class="p-col-12">
                    <div class="product-list-item">
                        <div class="p-grid">
                            <img class="p-col-4 p-mt-2" :src="slotProps.data.product_photo" :alt="'user header'"/>
                            <div class="product-list-detail p-col-4 p-mt-6">
                                <div class="product-name">{{slotProps.data.product_name}}</div>
                                <div class="product-description">{{slotProps.data.expiration_date}}</div>
                                <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.product_type}}</span>
                            </div>
                            <div class="product-list-action p-col-4 p-mt-6">
                                <span class="product-price p-col-12">${{slotProps.data.product_price}}</span>
                                <Button icon="pi pi-times-circle" @click="openConfirmationModal(slotProps.data, 'delete')" label=" Delete" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </DataView>
        <div class="p-col-4 p-pt-4">
            <h1>Total Cost:</h1>
            <h3><span>$555.25</span></h3>
            <Button icon="pi pi-check" label="Check Out" @click="checkOutOrders" ></Button>
        </div>

    </div>
</template>
<script>

export default {
    mounted() {
        this.myCart = JSON.parse(localStorage.getItem('myCart'));
        console.log(JSON.parse(localStorage.getItem('myCart')))
    },
   methods: {
       checkOutOrders(){
           this.$toast.add({severity:'success', summary: 'Purchased!', life: 3000,});
           this.$router.push({ name: 'DiscountedProduce' });
           let cart = []
           localStorage.setItem('myCart',JSON.stringify(cart));
           //clear cart
       },
       openConfirmationModal(product, task) {
            this.selectedProduct = product;
            this.selectedTask = task;
            console.log(product)
            this.$toast.add({severity:'info', summary: 'Removed!', life: 3000,});          

            this.myCart = this.myCart.filter(e => e !== product)
            localStorage.setItem('myCart',JSON.stringify(this.myCart));
            console.log(this.myCart)
        },
   },
    data() {
		return {
            confirmationModalIsVisible: false,
            myCart: [],
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