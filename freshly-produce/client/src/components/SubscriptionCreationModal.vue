<template>
  <Dialog
    :visible="isVisible"
    :modal="true"
    :closable="false"
    :showHeader="false" >
    <h2>Add a new product for your customers to subscribe to:</h2>

    <div>
      <h3>Product Information</h3>
      <div class="p-fluid">
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="photo">
            Product Photo
          </label>
          <div class="p-col-8">
            <img
              v-if="productObject.product_photo"
              class="product-photo"
              alt="product photo"
              :src="productObject.product_photo" />
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
              *If you don't upload a photo now,
              a random photo will be shown for your product.
              You can always upload a photo later!
            </sub>
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="name">
            Product Name
          </label>
          <div class="p-col-8">
            <InputText
              id="name"
              type="text"
              v-model="productObject.product_name" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="description">
            Product Description
          </label>
          <div class="p-col-8">
            <Textarea
              id="description"
              :autoResize="true"
              v-model="productObject.product_description" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="price">
            Product Price
          </label>
          <div class="p-col-8">
            <div class="p-inputgroup">
              <span class="p-inputgroup-addon">$</span>
              <InputNumber
                id="price"
                v-model="productObject.product_price"
                :minFractionDigits="2"
                :maxFractionDigits="2" />
            </div>
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="unit">
            Unit of Measurement
          </label>
          <div class="p-col-8">
            <Dropdown
              v-model="productObject.unit"
              :options="unitOfMeasurement"
              optionLabel="unit"
              optionValue="unit"
              placeholder="Select a unit"
              @change="setMinDecimal()" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-4"
            for="quantity">
          Quantity
          </label>
          <div class="p-col-8" >
            <InputNumber
              v-model="productObject.quantity"
              :minFractionDigits="minDecimal"/>
          </div>
        </div>
      </div>
      <div class="p-fluid">
      <h3>Subscription Plan Terms</h3>
        <div class="p-field p-grid">
          <label
            class="p-col-12 p-md-4"
            for="frequency">
            Delivery Frequency
          </label>
          <div class="p-col-12 p-md-8">
            <Dropdown
              v-model="productObject.frequency"
              :options="frequencyOfDelivery"
              optionLabel="frequency"
              optionValue="frequency"
              placeholder="Select a Frequency" />
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-12 p-md-4"
            for="price">
            Delivery Day
          </label>
          <div class="p-col-12 p-md-8">
            <Dropdown
              v-model="productObject.delivery_day"
              :options="days"
              optionLabel="day"
              optionValue="code"
              placeholder="Select the day of the week" />
          </div>
        </div>
      </div>
      <div class="action-buttons">
        <Button
          label="Cancel"
          class="p-button-danger"
          @click="onCancel"
          icon="pi pi-times"
          iconPos="left" />
        <Button
          label="Submit"
          @click="onSubmit"
          icon="pi pi-check"
          iconPos="left" />
      </div>
    </div>
  </Dialog>
</template>

<script>
import { toArrayBuffer } from '../services/FileService'
import { createNewSubscription } from '../api/SubscriptionsApi.js'
import { PRODUCT_TYPE } from '../models.js'

export default {
  name: 'SubscriptionCreationModal',
  props: {
    isVisible: Boolean,
  },
  data() {
    return {
      minDecimal: 0,
      productObject: {
        product_photo: null,
        product_name: '',
        product_description: '',
        product_price: null,
        product_type: PRODUCT_TYPE['subscription'],
        quantity: null,
        unit: '',
        frequency: '',
        delivery_day: '',
      },
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
    }
  },
  computed: {
    days: function () {
      if (this.productObject === null) {
        return null;
      } else if (this.productObject.frequency == 'Monthly') {
        const options = [
          {day: 'first Monday of the month', code: 1},
          {day: 'first Tuesday of the month', code: 2},
          {day: 'first Wednesday of the month', code: 3},
          {day: 'first Thursday of the month', code: 4},
          {day: 'first Friday of the month', code: 5},
        ]
        return options
        } else if (this.productObject.frequency == 'Weekly' || this.productObject.frequency == 'Bi-weekly') {
        const options = [
          {day: 'Monday', code: 1},
          {day: 'Tuesday', code: 2},
          {day: 'Wednesday', code: 3},
          {day: 'Thursday', code: 4},
          {day: 'Friday', code: 5},
        ]
        return options
      }
      return null;
    }
  },
  methods: {
    setMinDecimal() {
      if (this.productObject.unit === 'Units') {
        this.quantity = Math.trunc(this.quantity)
        this.minDecimal = 0;
      } else {
        this.minDecimal = 2;
      }
    },
    async addFile(event) {
      try {
        let image = await toArrayBuffer(event.files[0])
        this.productObject['product_photo'] = image
      } catch(error) {
        console.error(error)
      }
    },

    onCancel() {
      this.$emit('closeModal');
    },

    onSubmit() {
      createNewSubscription(this.productObject).then(() => {
        this.$emit('submitForm');
      });
    }
  }
}
</script>

<style scoped>

.p-fluid {
  width: 700px;
}

.p-field {
  text-align: start;
}

h2, h3 {
  text-align: start;
}

.action-buttons {
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
</style>