<template>
    <div id="addProduce">
        <Dialog
            header="Add Discounted Produce"
            v-model:visible="display"
            :modal="true"
            :closable=false
            :contentStyle="{paddingBottom: '0', overflow: 'visible'}"
            class="p-col-8 p-p-0">
            <h3>Product Information</h3>

            <div class="p-fluid p-field p-grid" style="width:100%">
                <div class="p-field p-col-12 p-mt-2">
                    <InputText v-model="addProductValue.product_name" placeholder="Product Name" id="product_name" type="text" />
                </div>
                <div class="p-field p-col-12">
                    <InputText id="description" placeholder="Product Description" v-model="addProductValue.product_description" />
                </div>
                <div class="p-field p-col-12 ">
                    <Dropdown v-model="addProductValue.product_category"
                        :options="produeType"
                        optionLabel="type"
                        optionValue="type"
                        placeholder="Select a Produce Type" />
                </div>

                <div class="p-field p-col-6 ">
                    <InputNumber id="qty" placeholder="Quantity" v-model="addProductValue.quantity" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-6">
                    <Dropdown
                        v-model="addProductValue.unit"
                        :options="unitType"
                        optionLabel="unit"
                        optionValue="unit"
                        placeholder="Select unit" />
                </div>

                <div class="p-field p-col-12 p-md-6">
                    <label for="Price">Price</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">$</span>
                        <InputText v-model="addProductValue.product_price" placeholder="Price" />
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <label for="Expiry Date">Expiry Date</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-calendar"></i>
                        </span>
                        <Calendar v-model="addProductValue.expiration_date" placeholder="YYYY-MM-DD"
                        dateFormat="yy-mm-dd"
                        :manualInput="false"/>
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
                        chooseLabel="Upload Photo"
                        :showUploadButton="false"
                        :showCancelButton="false">
                        <template>
                        </template>
                    </FileUpload>
                    <sub>
                        *If you don't upload a photo,
                        a random photo will be shown for your product.
                        You can always upload a photo later!
                    </sub>
                </div>
            </div>
            <template #footer>

                <Button label="Cancel" class="p-button-danger" icon="pi pi-times-circle" @click="closeModal" autofocus />
                <Button label="Submit" icon="pi pi-check-circle" @click="submit" autofocus
                    :disabled="isDisabled" />


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
			display: this.isVisible,
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
                product_photo: '',
                product_name: null,
                product_description: null,
                product_price: null,
                product_category: null,
                product_type: PRODUCT_TYPE['discounted_produce'],
                unit: null,
                quantity: null,
                expiration_date: null,
                user_id: JSON.parse(sessionStorage.getItem('currentUser')).user_id
            }
		}
	},
    methods: {
        closeModal() {
            this.display = false;
            this.$emit('eventname', this.display)
        },
        async addFile(event) {
            let image = await toArrayBuffer(event.files[0])
            this.addProductValue['product_photo'] = image;
        },
        submit(){
            try{
                ProductsApi.addProduct(this.addProductValue).then(() => {
                    this.$toast.add({severity:'success', summary: 'Added discounted product successfully!', life: 3000,});
                    this.resetData();
                    this.closeModal();
                })

            }catch(err){
                console.log(err)
            }

        },
        resetData(){
			this.display = this.isVisible;
            this.product_photo = '';
            this.product_name = null;
            this.product_description = null;
            this.product_price = null;
            this.product_category = null;
            this.product_type = PRODUCT_TYPE['discounted_produce'];
            this.unit = null;
            this.quantity = null;
            this.expiration_date = null;
            this.user_id = JSON.parse(sessionStorage.getItem('currentUser')).user_id
        }
    },
    computed: {
        isDisabled: function () {
        let hasNull = Object.keys(this.addProductValue).find(keys => this.addProductValue[keys] === null);
        if (hasNull) {
            return true;
        }
            return false;
        },
    }
}
</script>

<style scoped>
    #addProduce {
        background-color: coral;
        width: 300px;
    }
    h3 {
        margin-top: 0;
        text-align: start;
    }
</style>