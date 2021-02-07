<template>
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
            name="demo[]"
            :showUploadButton="false"
            :customUpload="true"
            @uploader="myUploader"
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
            type="text"/>
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
            type="text"/>
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
            v-model="selectedUnit"
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
            v-model="quantity"
            :minFractionDigits="minDecimal"/>
        </div>
      </div>
      <div class="p-field p-grid p-jc-end">
        <div class="p-col-fixed submit-button">
          <Button 
            label="Submit"
            @click="onSubmit"/>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ProductDescriptionForm',
  data() {
    return {
      minDecimal: 0,
      quantity: null,
      productPhoto: null,
      selectedUnit: null,
      units: [
        {name: 'Unit'},
        {name: 'Kg'},
        {name: 'Lbs'}
      ],

    }
  },
  methods: {
    setMinDecimal() {
      if (this.selectedUnit.name === 'Unit') {
        this.quantity = Math.trunc(this.quantity)
        this.minDecimal = 0;
      } else {
        this.minDecimal = 2;
      }
    },
    myUploader(event) {
      console.log(event.files)
    },
    onSubmit() {
      this.$emit('submitForm');
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

</style>