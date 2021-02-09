<template>
    <div class="p-grid">
        <DataView class="p-pt-4 p-pl-4 p-col-8" :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
            <template #list="slotProps">
                <div class="p-col-12">
                    <div class="product-list-item">
                        <div class="p-grid">
                            <img class="p-col-4 p-mt-2" :src="'/images/temp/carrots.jpg'" :alt="'user header'"/>
                            <div class="product-list-detail p-col-4 p-mt-6">
                                <div class="product-name">{{slotProps.data.product_name}}</div>
                                <div class="product-description">{{slotProps.data.expiration_date}}</div>
                                <i class="pi pi-tag product-category-icon"></i><span class="product-category">{{slotProps.data.product_type}}</span>
                            </div>
                            <div class="product-list-action p-col-4 p-mt-6">
                                <span class="product-price">${{slotProps.data.product_price}}</span>
                                <Button icon="pi pi-times-circle" label="Delete" />

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
   methods: {
       checkOutOrders(){
           this.$toast.add({severity:'success', summary: 'Purchased!', life: 3000,});
           this.$router.push({ name: 'DiscountedProduce' });
           //clear cart
       }
   },
    data() {
		return {
            layout: 'list',
            sortKey: null,
            sortOrder: null,
            sortField: null,
            sortOptions: [
                {label: 'Price High to Low', value: '!product_price'},
                {label: 'Price Low to High', value: 'product_price'},
            ],
            listProduct: [
                {
                    product_name: "Sub",
                    product_type: "Food",
                    product_price: 5.12,
                    expiration_date: "2021-02-07"
                },
                {
                    product_name: "Pear",
                    product_type: "Food",
                    product_price: 11.12,
                    expiration_date: "2021-01-07"
                },
                {
                    product_name: "Berries",
                    product_type: "Food",
                    product_price: 15.12,
                    expiration_date: "2021-01-17"
                },
                {
                    product_name: "Oranges",
                    product_type: "Food",
                    product_price: 9.12,
                    expiration_date: "2021-02-02"
                },
                {
                    product_name: "Apple",
                    product_type: "Food",
                    product_price: 7.12,
                    expiration_date: "2021-02-01"
                },
                {
                    product_name: "Broccoli",
                    product_type: "Food",
                    product_price: 14.12,
                    expiration_date: "2021-02-04"
                },
                {
                    product_name: "Sub",
                    product_type: "Food",
                    product_price: 8.12,
                    expiration_date: "2021-02-06"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 6.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 9.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 10.12,
                    expiration_date: "2021-01-18"
                },
                {
                    product_name: "Carrots",
                    product_type: "Food",
                    product_price: 9.45,
                    expiration_date: "2021-01-18"
                }
            ]
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