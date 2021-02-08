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
        {frequency: 'Weekly'},
        {frequency: 'Bi-weekly'},
        {frequency: 'Monthly'}
      ],
    }
  },
  methods: {
    nextPage() {
      this.$emit('next-page');
    }
  },
  computed: {
    days: function () {
      if (this.selectedFrequency === null) {
        return null;
      } else if (this.selectedFrequency.frequency == 'Monthly') {
        const options = [
          {day: 'first Monday of the month'},
          {day: 'first Tuesday of the month'},
          {day: 'first Wednesday of the month'},
          {day: 'first Thursday of the month'},
          {day: 'first Friday of the month'},
        ]
        return options
        } else if (this.selectedFrequency.frequency == 'Weekly' || this.selectedFrequency.frequency == 'Bi-weekly') {
        const options = [
          {day: 'Monday'},
          {day: 'Tuesday'},
          {day: 'Wednesday'},
          {day: 'Thursday'},
          {day: 'Friday'},
        ]
        return options
      }
      return null;
    }
  },
}
</script>

<style scoped>
.p-fluid {
  width: 1000px;
  height: 500px;
}

.submit-button {
  width: 150px;
}

</style>