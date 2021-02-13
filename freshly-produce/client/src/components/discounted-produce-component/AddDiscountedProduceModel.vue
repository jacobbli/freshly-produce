<template>
    <div>
        <Dialog header="Header" v-model:visible="display" :closable=false class="p-col-6">
            <template #header>
                <h2>Add Discounted Produce</h2>
            </template>
            <div class="p-fluid p-formgrid p-grid ">
                <div class="p-field p-col-12 p-mt-2">
                    <InputText v-model="productName" placeholder="Product Name" id="product_name" type="text" />
                </div>
                <div class="p-field p-col-12 ">
                    <Dropdown v-model="selectedProdueType" :options="produeType" optionLabel="type" placeholder="Select a Produce Type" />
                </div>

                <div class="p-field p-col-12 p-md-6">
                    <InputNumber id="qty" placeholder="Qty" v-model="qtyValue" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <Dropdown v-model="selectedUnitType" :options="unitType" optionLabel="unit" placeholder="Select unit" />
                </div>

                <div class="p-field p-col-12 p-md-6">
                    <label for="Price">Price</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">$</span>
                        <InputText v-model="price" placeholder="10" />
                        <span class="p-inputgroup-addon">.00</span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <label for="Expiry Date">Expiry Date</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-calendar"></i>
                        </span>
                        <InputText v-model="date" placeholder="YYYY-MM-DD " />
                    </div>
                </div>
                <div class="p-field p-col-12">
                    <label for="Upload Photo">Upload Produce Photo</label>
                    <FileUpload name="demo[]" url="./upload" />
                </div>

            </div>
            <template #footer>
            <div class="p-grid">
                <div class="p-field p-col-6 ">
                    <Button label="Cancel" icon="pi pi-times-circle" @click="closeModal" autofocus />
                </div>
                <div class="p-field p-col-6">
                    <Button label="Submit" icon="pi pi-check" @click="submit" autofocus />
                </div>
            
            </div>
            </template>
        </Dialog>
    </div>
</template>

<script>
import ProductsApi from '../../api/ProductsApi.js'
export default {
    props: {
        isVisible: Boolean,
    },
    watch:
    {
        isVisible(newVal){
            this.display = newVal
        }
    },
    data() {
		return {
            date: "",
            qtyValue: null,
            price: null,
			display: this.isVisible,
            productName: null,
            selectedProdueType: null,
            selectedUnitType: null,
            userId: null,
            produeType: [
                {type: 'Root'},
                {type: 'Tuber'},
                {type: 'Fruit'},
                {type: 'Flower'},
                {type: 'Bulb'},
                {type: 'Seed'},
                {type: 'Leave'},
                {type: 'Stem'},
            ],
            unitType: [
                {unit: 'count'},
                {unit: 'kg'},
                {unit: 'g'},
            ]
		}
	},
    beforeMount() {
        this.userId = JSON.parse(sessionStorage.getItem('currentUser')).user_id;
    },
    methods: {
        closeModal() {
            this.display = false;
            this.$emit('eventname', this.display)
        },
        submit(){
            try{
                let addProductValue = {
                    product_name: this.productName,
                    product_type: this.selectedProdueType["type"],
                    product_price: this.price,
                    unit: this.selectedUnitType["unit"],
                    quantity: this.qtyValue,
                    expiration_date: this.date,
                    user_id: this.userId,
                }
                ProductsApi.addProduct(addProductValue)
                this.$toast.add({severity:'success', summary: 'Submited!', life: 3000,});          
                this.resetData();
                this.closeModal();
            }catch(err){
                console.log(err)
            }
            
        },
        resetData(){
            this.date = "";
            this.qtyValue = null;
            this.price = null;
			this.display = this.isVisible;
            this.productName = null;
            this.selectedProdueType = null;
            this.selectedUnitType = null;
            this.userId = null;
        }
    },
}
</script>