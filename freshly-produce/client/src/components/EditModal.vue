<template>
  <Dialog
    :visible="isVisible"
    :showHeader="false"
    :modal="true"
    :closable="false"
    @show="updateFormValues" 
    class="p-col-8 p-p-0" >
    <h2>Modify Your Subscription Plan</h2>
    <h3>Product Information</h3>
      <div class="p-fluid p-field p-grid" style="width:100%">
        <div class="p-field p-col-12 p-mt-2">
          <InputText
            v-model="productObject.product_name"
            placeholder="Product Name"
            type="text"
            :class="{ 'p-invalid': !productObject.product_name }"/>
        </div>
        <div class="p-field p-col-12">
          <Textarea
            id="description"
            :autoResize="true"
            placeholder="Product Description"
            v-model="productObject.product_description"
            :class="{ 'p-invalid': !productObject.product_description }" />
        </div>
        <div class="p-field p-col-12 ">
          <Dropdown
            v-model="productObject.product_category"
            :options="productCategory"
            optionLabel="type"
            placeholder="Select a Product Category"
            :class="{ 'p-invalid': !productObject.product_category }" />
        </div>
        <div class="p-field p-col-6 ">
            <InputNumber id="qty" placeholder="Quantity"
              :minFractionDigits="minDecimal"
              :class="{ 'p-invalid': !productObject.quantity }"
              v-model="productObject.quantity"
              mode="decimal"
              showButtons
              :min="0"
              :max="1000" />
        </div>
        <div class="p-field p-col-6">
            <Dropdown
              v-model="productObject.unit"
              :options="unitOfMeasurement"
              optionLabel="unit"
              optionValue="unit"
              placeholder="Unit of Measurement"
              @change="setMinDecimal()"
              :class="{ 'p-invalid': !productObject.unit }" />
        </div>
        <div class="p-field p-col-12 p-md-6">
          <div class="p-inputgroup">
              <span class="p-inputgroup-addon">$</span>
              <InputNumber
                id="price"
                v-model="productObject.product_price"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                :class="{ 'p-invalid': !productObject.product_price }"
                placeholder="Price" />
          </div>
        </div>

        <div class="p-field p-col-12">
          <label
            class="p-col-4"
            for="photo">
            Upload Product Photo
          </label>
          <div class="p-col-8">
            <FileUpload
              mode="basic"
              id="photo"
              class="p-fileupload-sm"
              name="product_photo"
              url=""
              :auto="true"
              :customUpload="true"
              @uploader="addFile"
              accept="image/*"
              :maxFileSize="1000000"
              chooseLabel="Upload Photo">
              <template>
              </template>
            </FileUpload>
            <sub>
              *If you don't upload a photo,
              a random photo will be shown for your product.
              You can always upload a photo later!
            </sub>
            <div>
            <img
              v-if="productObject.product_photo"
              class="product-photo"
              alt="product photo"
              :src="productObject.product_photo" />
              </div>
          </div>
        </div>
        </div>
        <h3>Subscription Terms</h3>
        <div class="p-fluid p-field p-grid" style="width:100%">

        <div class="p-field p-col-6 ">
            <Dropdown
              v-model="productObject.frequency"
              :options="frequencyOfDelivery"
              optionLabel="frequency"
              optionValue="frequency"
              placeholder="How often will you ship your products?"
              :class="{ 'p-invalid': !productObject.frequency }" />
        </div>
        <div class="p-field p-col-6">
            <Dropdown
              v-model="productObject.delivery_day"
              :options="days"
              optionLabel="day"
              optionValue="code"
              placeholder="On which day of the week will you ship?"
              :class="{ 'p-invalid': !productObject.delivery_day }" />
        </div>
      </div>
    <div class="button-group">
      <Button
        label="Cancel"
        class="p-button-danger"
        @click="cancel"
        icon="pi pi-times-circle"
        iconPos="left" />
      <Button
        label="Submit"
        @click="editProduct()"
        icon="pi pi-check"
        iconPos="left" />
    </div>
  </Dialog>
</template>

<script>
import { editSubscription } from '../api/SubscriptionsApi.js'
import { toArrayBuffer } from '../services/FileService'

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
      editSubscription(this.productObject).then(() => {
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
        product_photo: '',
        unit: '',
        quantity: 0,
        frequency: '',
        delivery_day: ''
      },
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
      productCategory: [
        {type: 'Root'},
        {type: 'Tuber'},
        {type: 'Fruit'},
        {type: 'Flower'},
        {type: 'Bulb'},
        {type: 'Seed'},
        {type: 'Leave'},
        {type: 'Stem'},
      ]
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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

h2, h3 {
  text-align: start;
}

</style>