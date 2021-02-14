<template>
  <div>
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="frequency">
          Product Photo
        </label>
        <div class="p-col-12 p-md-8">
          <!-- <Card>
          </Card> -->
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
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="name">
          Product Name
        </label>
        <div class="p-col-12 p-md-8">
          <InputText
            id="name"
            type="text"
            v-model="productObject.product_name" />
        </div>
      </div>
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="description">
          Product Description
        </label>
        <div class="p-col-12 p-md-8">
          <InputText
            id="description"
            type="text"
            v-model="productObject.product_description" />
        </div>
      </div>
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="price">
          Product Price
        </label>
        <div class="p-col-12 p-md-8">
          <InputNumber
            id="price"
            :minFractionDigits="2"
            :maxFractionDigits="2"
            v-model="productObject.product_price" />
        </div>
      </div>
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="unit">
          Unit of Measurement
        </label>
        <div class="p-col-12 p-md-8">
          <Dropdown
            v-model="productObject.selectedUnit"
            :options="units"
            optionLabel="name"
            placeholder="Select a unit"
            @change="setMinDecimal()" />
        </div>
      </div>
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="quantity">
        Quantity
        </label>
        <div class="p-col-12 p-md-8">
          <InputNumber
            v-model="productObject.quantity"
            :minFractionDigits="minDecimal"/>
        </div>
      </div>
    </div>
    <Button 
      label="Cancel"
      class="p-button-danger"
      @click="cancel"
      iconPos="right" />
    <Button 
      label="Next"
      @click="nextPage()" 
      icon="pi pi-angle-right" 
      iconPos="right" />
  </div>
</template>

<script>
import { toArrayBuffer } from '../../services/FileService'
export default {
  name: 'ProductDescriptionForm',
  data() {
    return {
      minDecimal: 0,
      productObject: {
        product_name: '',
        product_description: '',
        product_price: null,
        quantity: null,
        photo: null,
        selectedUnit: null,
      },
      units: [
        {name: 'Units'},
        {name: 'Kg'},
        {name: 'Lbs'}
      ],

    }
  },
  methods: {
    setMinDecimal() {
      if (this.productObject.selectedUnit.name === 'Unit') {
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
    nextPage() {
      this.$emit('next-page', this.productObject);
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>

<style scoped>
.p-fluid {
  width: 1000px;
  height: 500px;
}

.p-fileupload	{
  text-align: end;
}

.submit-button {
  width: 150px;
}

button {
	margin-right: .5rem;
}

</style>