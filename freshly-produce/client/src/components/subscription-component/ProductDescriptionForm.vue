<template>
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label 
          class="p-col-12 p-md-4"
          for="frequency">
          Product Photo
        </label>
        <div class="p-col-12 p-md-8">
          <FileUpload mode="basic" name="demo[]" url="./upload" accept="image/*" />
        </div>
      </div>
      <div class="p-field p-grid">
        <label 
          class="p-col-12 p-md-4"
          for="frequency">
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
          for="frequency">
          Product Description
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
          for="frequency">
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
          <Button label="Submit"/>
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
    }
  },
  computed: {
    days: function () {
      if (this.selectedFrequency === null) {
        return null;
      } else if (this.selectedFrequency.name == 'Monthly') {
        const options = [
          {name: 'first Monday of the month'},
          {name: 'first Tuesday of the month'},
          {name: 'first Wednesday of the month'},
          {name: 'first Thursday of the month'},         
          {name: 'first Friday of the month'},
        ]
        return options      
        } else if (this.selectedFrequency.name == 'Weekly' || this.selectedFrequency.name == 'Bi-weekly') {
        const options = [
          {name: 'Monday'},
          {name: 'Tuesday'},
          {name: 'Wednesday'},
          {name: 'Thursday'},         
          {name: 'Friday'},
        ]
        return options
      }
      return null;
    }
  }
}
</script>

<style scoped>
.p-fluid {
  width: 500px;
}

.submit-button {
  width: 150px;
}

.p-fileupload {
  text-align: start;
}
</style>