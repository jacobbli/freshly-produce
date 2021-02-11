<template>
  <div>
    <div class="p-fluid">
      <div class="p-field p-grid">
        <label
          class="p-col-12 p-md-4"
          for="frequency">
          Delivery Frequency
        </label>
        <div class="p-col-12 p-md-8">
          <Dropdown
            v-model="selectedFrequency"
            :options="frequency"
            optionLabel="frequency"
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
            v-model="selectedDay"
            :options="days"
            optionLabel="day"
            placeholder="Select the day of the week" />
        </div>
      </div>
    </div>
    <Button 
      label="Cancel"
      class="p-button-danger"
      @click="cancel"
      iconPos="right" />
    <Button 
      label="Submit"
      @click="onSubmit()" 
      icon="pi pi-check" 
      iconPos="left" />
  </div>
</template>

<script>
import { createNewSubscription } from '../../api/SubscriptionsApi.js'
import { PRODUCT_TYPE, WEEK_DAY } from '../../models.js'

export default {
  name: 'FrequencySelectionForm',
  data() {
    return {
      selectedFrequency: null,
      selectedDay: null,
      frequency: [
        {frequency: 'Weekly'},
        {frequency: 'Bi-weekly'},
        {frequency: 'Monthly'}
      ],
    }
  },
  props: {
    productObject: {}
  },
  computed: {
    days: function () {
      if (this.selectedFrequency === null) {
        return null;
      } else if (this.selectedFrequency.frequency == 'Monthly') {
        const options = [
          {day: 'first Monday of the month', code: 'Monday'},
          {day: 'first Tuesday of the month', code: 'Tuesday'},
          {day: 'first Wednesday of the month', code: 'Wednesday'},
          {day: 'first Thursday of the month', code: 'Thursday'},
          {day: 'first Friday of the month', code: 'Friday'},
        ]
        return options
        } else if (this.selectedFrequency.frequency == 'Weekly' || this.selectedFrequency.frequency == 'Bi-weekly') {
        const options = [
          {day: 'Monday', code: 'Monday'},
          {day: 'Tuesday', code: 'Tuesday'},
          {day: 'Wednesday', code: 'Wednesday'},
          {day: 'Thursday', code: 'Thursday'},
          {day: 'Friday', code: 'Monday'},
        ]
        return options
      }
      return null;
    }
  },
  methods: {
    onSubmit() {
      var tempObject = {
        product_name: this.productObject.product_name,
        product_description: this.productObject.product_description,
        product_type: PRODUCT_TYPE['subscription'],
        product_price: this.productObject.product_price,
        unit: this.productObject.selectedUnit.name,
        quantity: this.productObject.quantity,
        product_photo: this.productObject.photo,
        frequency: this.selectedFrequency.frequency,
        delivery_day: WEEK_DAY[this.selectedDay.code]
      }
      createNewSubscription(tempObject).then(() => {
        this.$emit('submitForm');
      });
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

button {
	margin-right: .5rem;
}
</style>