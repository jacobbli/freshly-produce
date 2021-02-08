<template>
  <Dialog 
    :header="setHeader" 
    :visible="isVisible" 
    :modal="true"
    :closable="false">
    <div class="product-info">
      <p>Product Name: {{selectedProduct.product_name}}</p>
      <p>Product Type: {{selectedProduct.product_type}}</p>
      <p>Product Price: {{selectedProduct.product_price}}</p>
    </div>
    <h3>Please enter your payment information</h3>
    <div class="p-grid ">
        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-credit-card"></i>
            </span>
                <InputText placeholder="Credit Card Number" />
            </div>
        </div>

        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-calendar"></i>
                </span>
                <InputText placeholder="Credit Card Expiration Date" />
            </div>
        </div>

        <div class="p-col-12 p-md-4">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>                  
                </span>
                <InputNumber placeholder="Credit Card Security Code" />
            </div>
        </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button label="Place Order" icon="pi pi-check" @click="placeOrder" autofocus />
    </template>
  </Dialog>
</template>

<script>
export default {
  name: 'OrderModal',
  props: {
    isVisible: Boolean,
    selectedProduct: null,
    selectedTask: null
  },
  computed: {
    setHeader: function() {
      if (this.selectedTask == 'subscribe') {
        return 'Please confirm your subscription';       
      } else if (this.selectedTask == 'single-purchase') {
        return 'Please confirm your order';       
      } else {
        return null;
      }
    }
  },  
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    placeOrder() {
      this.$emit('placeOrder');
    },
  }
}
</script>

<style>

</style>