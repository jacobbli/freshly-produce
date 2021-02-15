<template>
  <Dialog
    header="Make changes to your product:"
    :visible="isVisible"
    :modal="true"
    :closable="false"
    :contentStyle="{overflow: 'visible'}"
    @show="updateFormValues">
        <div class="p-fluid">
          <div class="p-field p-grid">
            <label
              class="p-col-4"
              for="name">
              Product Photo
            </label>
            <div class="p-col-8">
              <img
                class="product-photo"
                alt="product photo"
                :src="productObject.product_photo" />
              <FileUpload
                mode="basic"
                name="product_photo"
                url=""
                :auto="true"
                :customUpload="true"
                @uploader="addFile"
                accept="image/*"
                :maxFileSize="1000000"
                chooseLabel="Change Photo" />
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
                  :maxFractionDigits="2"/>
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
              :minFractionDigits="minDecimal" />
          </div>
        </div>
      <div class="p-field p-grid">
        <label
          class="p-col-4"
          for="price">
          Expiry Day
        </label>
        <div class="p-col-8">
          <Calendar 
            v-model="productObject.expiration_date"
            dateFormat="yy-mm-dd"
            :showTime="false"
            />
        </div>
      </div>
      <div class="button-group">
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
      </div>
    </div>
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
      console.log(this.productObject.unit)
      this.productObject.product_price = parseFloat(this.productObject.product_price);
      this.productObject.quantity = parseFloat(this.productObject.quantity);
      this.productObject.delivery_day = parseFloat(this.productObject.delivery_day);
    },

    async addFile(event) {
      console.log(this.productObject.unit)
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
  width: 75%;
}
</style>