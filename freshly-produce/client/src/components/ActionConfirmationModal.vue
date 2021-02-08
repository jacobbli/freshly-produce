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
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button label="Yes" icon="pi pi-check" @click="confirm" autofocus />
    </template>
  </Dialog>
</template>

<script>
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
        return 'Unpublish this product?';
      } else if (this.selectedTask == 'unpublish') {
        return 'Publish this product?';
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
      if (this.selectedTask == 'publish') {
        this.$emit('publish');
      } else if (this.selectedTask == 'unpublish') {
        this.$emit('unpublish');
      } else if (this.selectedTask == 'delete') {
        this.$emit('delete');
      } else if (this.selectedTask == 'unsubscribe') {
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