<template>
  <div class="p-grid p-p-4">
    <div class="p-col-3" v-for='product in this.listProduct' :key='product.product_id'>
        <Card>
        <template #header>
            <img alt="user header" src="/images/temp/berries.jpg">
        </template>
        <template #title>
            {{product.product_name}}
        </template>
        <template #content>
            Food Type: {{product.product_type}}
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Subscribe" />
            <!-- <Button icon="pi pi-times" label="Cancel" class="p-button-secondary" style="margin-left: .5em" /> -->
        </template>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomerSubscriptionsPage',
  data() {
		return {
      listproduce:[
        "berries.jpg",
        "blueberries.jpg",
        "broccoli.jpg",
        "carrots.jpg"
      ]
      ,
      listProduct:[
        {
          product_id: 1,
          product_name: "carrots", 
          product_type: "food", 
        }, 
        {
          product_id: 2,
          product_name: "crrots", 
          product_type: "food", 
        }, 
        {
          product_id: 3,
          product_name: "carots", 
          product_type: "food", 
        }, 
        {
          product_id: 4,
          product_name: "carots", 
          product_type: "food", 
        }, 
        {
          product_id: 5,
          product_name: "carots", 
          product_type: "food", 
        }, 
        {
          product_id: 6,
          product_name: "carros", 
          product_type: "food", 
        }, 
      ]
		}
	}
}
</script>

<style>

</style>