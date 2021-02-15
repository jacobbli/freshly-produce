<template>
    <div id="addProduce">
        <Dialog header="Add Discounted Produce" v-model:visible="display" :closable=false class="p-col-8 p-p-0">
            <div class="p-fluid p-field p-grid" style="width:100%">
                <div class="p-field p-col-12 p-mt-2">
                    <InputText v-model="productName" placeholder="Product Name" id="product_name" type="text" />
                </div>
                <div class="p-field p-col-12">
                    <InputText id="qty" placeholder="Product Description" v-model="product_description" />
                </div>
                <div class="p-field p-col-12 ">
                    <Dropdown v-model="selectedProdueType" :options="produeType" optionLabel="type" placeholder="Select a Produce Type" />
                </div>

                <div class="p-field p-col-6 ">
                    <InputNumber id="qty" placeholder="Qty" v-model="qtyValue" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-6">
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
                    <FileUpload
                        class="p-fileupload-sm"
                        name="product_photo"
                        :auto="true"
                        :customUpload="true"
                        @uploader="addFile"
                        accept="image/*"
                        :maxFileSize="1000000"
                        chooseLabel="Upload Photo">
                        <template>
                        </template>
                    </FileUpload>
                </div>
            </div>
            <template #footer>

                <Button label="Cancel" class="p-button-danger" icon="pi pi-times-circle" @click="closeModal" autofocus />
                <Button label="Submit" icon="pi pi-check" @click="submit" autofocus />

 
            </template>
        </Dialog>
    </div>
</template>

<script>
import { toArrayBuffer } from '../../services/FileService'
import ProductsApi from '../../api/ProductsApi.js'
import { PRODUCT_TYPE } from  '../../models'

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
            product_description: "",
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
                {unit: 'Units'},
                {unit: 'Kg'},
                {unit: 'Lbs'}
            ],
            addProductValue: {
                    product_name: "",
                    product_type: "",
                    product_price: "",
                    unit: "",
                    quantity: "",
                    expiration_date: "",
                    user_id: "",
                    product_photo: null,
                }
		}
	},
    beforeMount() {
        this.addProductValue["user_id"] = JSON.parse(sessionStorage.getItem('currentUser')).user_id;
    },
    methods: {
        closeModal() {
            this.display = false;
            this.$emit('eventname', this.display)
        },
        async addFile(event) {
            let image = await toArrayBuffer(event.files[0])
            this.addProductValue['product_photo'] = image
        },
        submit(){
            try{
                this.addProductValue["product_name"] = this.productName;
                this.addProductValue["product_price"] = this.price;
                this.addProductValue["quantity"] = this.qtyValue;
                this.addProductValue["expiration_date"] = this.date;
                this.addProductValue["this.userId"] = this.userId;
                this.addProductValue["unit"] = this.selectedUnitType["unit"];
                this.addProductValue["product_category"] = this.selectedProdueType["type"];
                this.addProductValue["product_type"] = PRODUCT_TYPE.discounted_produce;
                ProductsApi.addProduct(this.addProductValue)
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

<style >
    #addProduce {
        background-color: coral;
        width: 300px;
    }
</style>