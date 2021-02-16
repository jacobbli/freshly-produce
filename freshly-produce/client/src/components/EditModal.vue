<template>
  <Dialog
    header="Modify Your Subscription Plan:"
    :visible="isVisible"
    :modal="true"
    :closable="false"
    @show="updateFormValues"
    :contentStyle="{paddingBottom: '0'}"
    class="p-col-8 p-p-0" >
    <h3>Product Information</h3>
    <div class="p-fluid p-field p-grid" style="width:100%">
      <div class="p-field p-grid p-col-12 p-p-0 p-mt-2">
        <label for="product_name" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Name</label>
          <div class="p-col-12 p-md-8 p-pr-0">
          <InputText
            id="product_name"
            v-model="productObject.product_name"
            placeholder="Product Name"
            type="text"
            :class="{ 'p-invalid': !productObject.product_name }"/>
        </div>
      </div>
      <div class="p-field p-grid p-col-12 p-p-0">
        <label for="product_description" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Description</label>
        <div class="p-col-12 p-md-8 p-pr-0">
          <Textarea
            id="product_description"
            :autoResize="true"
            placeholder="Product Description"
            v-model="productObject.product_description"
            :class="{ 'p-invalid': !productObject.product_description }" />
          </div>
        </div>
      <div class="p-field p-grid p-col-12 p-p-0">
        <label for="product_description" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Category</label>
        <div class="p-col-12 p-md-8 p-pr-0">
          <Dropdown
            id="product_category"
            v-model="productObject.product_category"
            :options="productCategory"
            optionLabel="type"
            optionValue="type"
            placeholder="Select a Product Category"
            :class="{ 'p-invalid': !productObject.product_category }" />
        </div>
      </div>
      <div class="p-field p-col-6 ">
        <label for="quantity">Subscription Quantity</label>
        <InputNumber
          id="Quantity"
          placeholder="Quantity"
          :minFractionDigits="minDecimal"
          :class="{ 'p-invalid': !productObject.quantity }"
          v-model="productObject.quantity"
          mode="decimal"
          showButtons
          :min="0"
          :max="1000" />
      </div>
        <div class="p-field p-col-6">
          <label for="unit">Unit of Measurement</label>
          <Dropdown
            id="unit"
            v-model="productObject.unit"
            :options="unitOfMeasurement"
            optionLabel="unit"
            optionValue="unit"
            placeholder="Unit of Measurement"
            @change="setMinDecimal()"
            :class="{ 'p-invalid': !productObject.unit }" />
        </div>

        <div class="p-field p-col-12 p-md-6">
          <label for="product_price">Price</label>
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

      <div class="p-field p-grid p-col-12 p-p-0">
        <label for="Upload Photo" class="p-col-12 p-mb-2 p-md-4 p-mb-md-0 p-pl-3">Product Photo</label>
        <div class="container p-col-12 p-md-8 p-mx-6">
          <img
            v-if="productObject.product_photo"
            class="product-photo"
            alt="product photo"
            :src="productObject.product_photo" />
          <FileUpload
            mode="basic"
            id="photo"
            class="btn"
            name="product_photo"
            url=""
            :auto="true"
            :customUpload="true"
            @uploader="addFile"
            accept="image/*"
            :maxFileSize="1000000"
            chooseLabel="Upload Photo">
            </FileUpload>
        </div>
      </div>

    </div>
    <h3>Subscription Terms</h3>
      <div class="p-fluid p-field p-grid" style="width:100%">

        <div class="p-field p-col-6 ">
          <label for="frequency">Delivery Frequency</label>
            <Dropdown
              id="frequency"
              v-model="productObject.frequency"
              :options="frequencyOfDelivery"
              optionLabel="frequency"
              optionValue="frequency"
              placeholder="How often will you ship your products?"
              :class="{ 'p-invalid': !productObject.frequency }" />
          </div>
          <div class="p-field p-col-6">
            <label day="Units">Day of Delivery</label>
              <Dropdown
                id="day"
                v-model="productObject.delivery_day"
                :options="days"
                optionLabel="day"
                optionValue="code"
                placeholder="On which day of the week will you ship?"
                :class="{ 'p-invalid': !productObject.delivery_day }" />
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
        this.$toast.add({severity:'success', summary: 'Modified subscription plan successfully!', life: 3000,});
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
        product_category: '',
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
  justify-content: flex-end;
}

.p-dropdown	 {
  text-align: start;
}

.p-fileupload {
  opacity: 0.8;
}

button {
	margin-right: .5rem;
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

</style>