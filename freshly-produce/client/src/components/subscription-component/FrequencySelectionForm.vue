<template>
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
      <div class="p-field p-grid p-jc-end">
        <div class="p-col-fixed submit-button">
          <Button
          label="Next"
          @click="nextPage()"
          icon="pi pi-angle-right"
          iconPos="right" />
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'FrequencySelectionForm',
  data() {
    return {
      selectedFrequency: null,
      selectedDay: null,
      frequency: [
        {name: 'Weekly'},
        {name: 'Bi-weekly'},
        {name: 'Monthly'}
      ],

    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page', {formData: {firstname: this.firstname, lastname: this.lastname, age: this.age}, pageIndex: 1});
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

</style>