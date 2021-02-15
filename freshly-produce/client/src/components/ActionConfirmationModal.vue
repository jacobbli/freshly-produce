<template>
  <Dialog
    :showHeader="false"
    :visible="isVisible"
    :modal="true"
    :closable="false">
    <h2>{{setHeader}}</h2>
    <div class="product-info">
      <h3>Product Information</h3>
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
        <h3>Subscription Terms</h3>
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Delivery Frequency
          </label>
          <div class="p-col-6">
            {{selectedProduct.frequency}}
          </div>
        </div>
        <div class="p-field p-grid">
          <label
            class="p-col-6"
            for="name">
            Delivery Day
          </label>
          <div class="p-col-6">
            {{displayedDay[selectedProduct.delivery_day]}}
          </div>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="button-group">
        <Button label="No" icon="pi pi-times-circle" @click="cancel" class="p-button-danger" />
        <Button label="Yes" icon="pi pi-check-circle" @click="confirm" autofocus />
      </div>
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

<style scoped>
.p-fluid {
  width: 400px;
}

.p-field {
  text-align: start;
}

h2, h3 {
  text-align: start;
}

.button-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>