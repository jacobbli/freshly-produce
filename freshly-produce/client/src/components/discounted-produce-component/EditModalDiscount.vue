<template>
  <Dialog
    header="Edit your discounted produce:"
    :visible="isVisible"
    :modal="true"
    :closable="false"
    class="p-col-8 p-p-0"
    @show="updateFormValues">
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
                      <Dropdown v-model="productObject.product_category" :options="produeType" optionLabel="type" placeholder="Select a Produce Type" />
                    </div>
                </div>

                <div class="p-field p-col-6 ">
                    <label for="Qty">Qty</label>
                    <InputNumber id="qty" placeholder="Qty" v-model="productObject.quantity" mode="decimal" showButtons :min="0" :max="1000" />
                </div>
                <div class="p-field p-col-6">
                    <label for="Units">Units</label>
                    <Dropdown v-model="productObject.unit" :options="unitOfMeasurement" optionLabel="unit" placeholder="Select unit" />
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
                        <Calendar v-model="productObject.expiration_date" placeholder="YY-MM-DD " :showTime="false"/>
                    </div>
                </div>
                <div class="p-field p-grid p-col-12 p-p-0">
                    <label for="Upload Photo" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Change Photo</label>
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
                icon="pi pi-times"
                iconPos="left" />
              <Button
                label="Confirm"
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
      console.log(this.selectedProduct)
      console.log(this.productObject.product_category)
      this.productObject.product_category = {type: ''+this.selectedProduct.product_category}
      this.productObject.unit = {unit: ''+this.selectedProduct.unit}
      this.productObject.product_price = parseFloat(this.productObject.product_price);
      this.productObject.quantity = parseFloat(this.productObject.quantity);
      this.productObject.delivery_day = parseFloat(this.productObject.delivery_day);
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
      selectedFrequency: {frequency: ''},
      selectedDay: Number,
      minDecimal: 0,
      unitOfMeasurement: [
        {unit: 'Units'},
        {unit: 'Kg'},
        {unit: 'Lbs'}
      ],
      frequencyOfDelivery: [
        {frequency: 'Weekly'},
        {frequency: 'Bi-weekly'},
        {frequency: 'Monthly'}
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
  },
  computed: {
    days: function () {
      let options = [];
      if (this.productObject === null) {
        return options;
      }
      if (this.productObject.frequency == 'Monthly') {
        options = [
          {day: 'first Monday of the month', code: 1},
          {day: 'first Tuesday of the month', code: 2},
          {day: 'first Wednesday of the month', code: 3},
          {day: 'first Thursday of the month', code: 4},
          {day: 'first Friday of the month', code: 5},
        ]
      } else if (this.productObject.frequency == 'Weekly' || this.productObject.frequency == 'Bi-weekly') {
        options = [
          {day: 'Monday', code: 1},
          {day: 'Tuesday', code: 2},
          {day: 'Wednesday', code: 3},
          {day: 'Thursday', code: 4},
          {day: 'Friday', code: 5},
        ]
      }
      return options;
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