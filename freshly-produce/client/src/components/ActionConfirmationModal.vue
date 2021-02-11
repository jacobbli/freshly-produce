<template>
  <Dialog 
    :header="setHeader" 
    :visible="isVisible" 
    :modal="true"
    :closable="false">
    <div class="product-info">
      <p>Product Name: {{selectedProduct.product_name}}</p>
      <p>Product Price: {{selectedProduct.product_price}}</p>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button label="Yes" icon="pi pi-check" @click="confirm" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { setPublishedStatus } from '../api/SubscriptionsApi.js'
import { unsubscribe } from '../api/SubscriptionsApi.js'
import { deleteProduct } from '../api/ProductsApi.js'

export default {
  name: 'ActionConfirmationModal',
  props: {
    isVisible: Boolean,
    selectedProduct: null,
    selectedTask: null
  },
  computed: {
    setHeader: function() {
      if (this.selectedTask == 'publish') {
        return 'Publish this product?';
      } else if (this.selectedTask == 'unpublish') {
        return 'Unpublish this product?';
      } else if (this.selectedTask == 'delete') {
        return 'Delete this product?';
      } else if (this.selectedTask == 'unsubscribe') {
        return 'Remove this subscription?';        
      } else {
        return null;
      }
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      if (this.selectedTask == 'publish' || this.selectedTask == 'unpublish') {
        setPublishedStatus(this.selectedProduct.product_id);
        this.$emit('changePublishedStatus');
      } else if (this.selectedTask == 'delete') {
        deleteProduct({'product_id': this.selectedProduct.product_id});
        this.$emit('delete');
      } else if (this.selectedTask == 'unsubscribe') {
        unsubscribe(this.selectedProduct.order_id);
        this.$emit('unsubscribe');
      }
    },
  }
}
</script>

<style>
.product-info {
  display: block;
}

</style>