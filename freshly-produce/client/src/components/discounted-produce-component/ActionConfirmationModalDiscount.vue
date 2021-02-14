<template>
  <Dialog
    :header="setHeader"
    :visible="isVisible"
    :modal="true"
    :closable="false">
    <div class="product-info">
      <div class="p-fluid">
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Product Name
          </label>
          <div class="p-col-6">
            {{selectedProduct.product_name}}
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Product Description
          </label>
          <div class="p-col-6">
            {{selectedProduct.product_description}}
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Product Price
          </label>
          <div class="p-col-6">
            ${{selectedProduct.product_price}}
          </div>
        </div>
          <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Quantity
          </label>
          <div class="p-col-6">
            {{selectedProduct.quantity}} {{selectedProduct.unit}}
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Expiration Date
          </label>
          <div class="p-col-6">
            {{selectedProduct.expiration_date}}
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button label="Yes" icon="pi pi-check" @click="confirm" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { setPublishedStatus } from '../../api/SubscriptionsApi.js'
import { unsubscribe } from '../../api/SubscriptionsApi.js'
import { deleteProduct } from '../../api/ProductsApi.js'

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
  },
  data() {
    return {
      displayedDay: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday'
      }
    }
  }
}
</script>

<style>
.p-fluid {
  width: 300px;
}

.p-field {
  text-align: start;
}

</style>