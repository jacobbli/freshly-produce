<template>
  <div class="p-fluid">
    <div class="p-field p-grid">
      <label 
        class="p-col-12 p-md-4"
        for="name">
        Item Name
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
        for="price">
        Item Price
      </label>
      <div class="p-col-12 p-md-8">
        <InputNumber
          id="price" />
      </div>
    </div>
    <div class="p-field p-grid">
      <label
        class="p-col-12 p-md-4"
        for="description">
        Item Description
      </label>
      <div class="p-col-12 p-md-8">
        <InputText
          id="description"
          type="text" />
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
  name: "SubscriptionCreationForm",
  methods: {
    nextPage() {
      this.$emit('next-page');
    }
  }
}
</script>

<style>
.p-fluid {
  width: 1000px;
  height: 500px;
}

.submit-button {
  width: 150px;
}
</style>