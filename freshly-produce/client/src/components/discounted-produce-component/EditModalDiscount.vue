<template>
  <Dialog
    header="Modify your discounted produce:"
    :visible="isVisible"
    :modal="true"
    :closable="false"
    class="p-col-8 p-p-0"
    :contentStyle="{paddingBottom: '0'}"
    @show="updateFormValues">
      <h3>Product Information</h3>
        <div class="p-fluid p-field p-grid" style="width:100%">
                <div class="p-field p-grid p-col-12 p-p-0 p-mt-2">
                  <label for="product_name" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product</label>
                  <div class="p-col-12 p-md-8 p-pr-0">
                    <InputText v-model="productObject.product_name" placeholder="Product Name" id="product_name" type="text" />
                  </div>
                </div>
                <div class="p-field p-grid p-col-12 p-p-0">
                  <label for="product_description" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Description</label>
                  <div class="p-col-12 p-md-8 p-pr-0">
                    <InputText  id="product_description" placeholder="Product Description" v-model="productObject.product_description" />
                  </div>
                </div>
                <div class="p-field p-grid p-col-12 p-p-0">
                    <label for="product_category" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Category</label>
                    <div class="p-col-12 p-md-8 p-pr-0">
                      <Dropdown v-model="productObject.product_category" :options="produeType"
                        optionLabel="type"
                        optionValue="type"
                        placeholder="Select a Produce Type" />
                    </div>
                </div>

                <div class="p-field p-col-6 ">
                    <label for="Qty">Qty</label>
                    <InputNumber id="qty" placeholder="Quantity" v-model="productObject.quantity" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-6">
                    <label for="Units">Units</label>
                    <Dropdown
                      v-model="productObject.unit"
                      :options="unitOfMeasurement"
                      optionLabel="unit"
                      optionValue="unit"
                      placeholder="Select unit" />
                </div>

                <div class="p-field p-col-12 p-md-6">
                    <label for="Price">Price</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">$</span>
                        <InputText v-model="productObject.product_price" placeholder="10" />
                        <span class="p-inputgroup-addon">.00</span>
                    </div>
                </div>
                <div class="p-field p-col-12 p-md-6">
                    <label for="Expiry Date">Expiry Date</label>
                    <div class="p-inputgroup">
                        <span class="p-inputgroup-addon">
                            <i class="pi pi-calendar"></i>
                        </span>
                        <Calendar v-model="productObject.expiration_date" dateFormat="yy-mm-dd"  placeholder="YYYY-MM-DD " :showTime="false"/>
                    </div>
                </div>
                <div class="p-field p-grid p-col-12 p-p-0">
                    <label for="Upload Photo" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Photo</label>
                    <div class="container p-col-12 p-md-8 p-mx-6">
                      <img
                        class="product-photo"
                        alt="product photo"
                        :src="productObject.product_photo" />
                      <FileUpload
                        mode="basic"
                        name="product_photo"
                        url=""
                        class="btn"
                        :auto="true"
                        :customUpload="true"
                        @uploader="addFile"
                        accept="image/*"
                        :maxFileSize="1000000"
                        chooseLabel="Change Photo" />
                    </div>


                </div>
            </div>
            <template #footer>
              <Button
                label="Cancel"
                class="p-button-danger"
                @click="cancel"
                icon="pi pi-times-circle"
                iconPos="left" />
              <Button
                label="Submit"
                @click="editProduct()"
                icon="pi pi-pencil"
                iconPos="left" />
            </template>
  </Dialog>
</template>

<script>
import { editDiscountProduce } from '../../api/DiscountedProductApi.js'
import { toArrayBuffer } from '../../services/FileService'

export default {
  name: 'EditModal',
  props: {
    isVisible: Boolean,
    selectedProduct: null
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    editProduct() {
      editDiscountProduce(this.productObject).then(() => {
        this.$emit('editProduct');
        this.$toast.add({severity:'success', summary: 'Modified discounted product successfully!', life: 3000,});

      })
    },
    setMinDecimal() {
      if (this.productObject.unit === 'Unit') {
        this.quantity = Math.trunc(this.quantity)
        this.minDecimal = 0;
      } else {
        this.minDecimal = 2;
      }
    },

    updateFormValues() {
      Object.assign(this.productObject, this.selectedProduct);
      this.productObject.product_category = this.selectedProduct.product_category;
      this.productObject.unit = this.selectedProduct.unit;
      this.productObject.product_price = parseFloat(this.productObject.product_price);
      this.productObject.quantity = parseFloat(this.productObject.quantity);
    },

    async addFile(event) {
      try {
        let image = await toArrayBuffer(event.files[0])
        this.productObject['product_photo'] = image
      } catch(error) {
        console.error(error)
      }
    }
  },
  data() {
    return {
      productObject: {
        product_id: '',
        product_name: '',
        product_description: '',
        product_price: 0,
        product_category: '',
        product_photo: '',
        unit: '',
        quantity: 0,
        expiration_date: ''
      },
      selectedUnit: {name: ''},
      minDecimal: 0,
      unitOfMeasurement: [
        {unit: 'Units'},
        {unit: 'Kg'},
        {unit: 'Lbs'}
      ],
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
    }
  }
}
</script>

<style scoped>
.p-fluid {
  width: 600px;
}

.p-field {
  text-align: start;
}

.button-group {
  display: inline-flex;
  text-align: center;
}

.p-dropdown	 {
  text-align: start;
}

button {
	margin-right: .5rem;
}

.product-photo {
  width: 50%;
}

.p-fileupload {
  opacity: 0.8;
}

h3 {
  margin-top: 0;
  text-align: start;
}

/* Container needed to position the button. Adjust the width as needed */
.container {
  position: relative;
  width: 50%;
}

/* Make the image responsive */
.container img {
  width: 100%;
  height: auto;
}

/* Style the button and place it in the middle of the container/image */
.container .btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  /* background-color: #555; */
  color: white;
  font-size: 16px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

/* .container .btn:hover {
  background-color: black;
} */
</style>