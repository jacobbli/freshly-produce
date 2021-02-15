<template>
  <Dialog 
    :showHeader="false"
    :visible="isVisible" 
    :modal="true"
    :closable="false"
    :contentStyle="{overflow: 'visible'}" >
    <h2>Subscribe to Product</h2>
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
    <h3>Payment Information</h3>
    <div class="p-fluid ">
        <div class="p-col-12">
            <div class="p-inputgroup">
            <span class="p-inputgroup-addon">
                <i class="pi pi-credit-card"></i>
            </span>
                <InputText placeholder="Credit Card Number" />
            </div>
        </div>

        <div class="p-col-12">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-calendar"></i>
                </span>
                <Calendar 
                  id="basic"
                  v-model="expirationDate"
                  placeholder="Expiration Date (mm/dd/yyyy)"/>
            </div>
        </div>

        <div class="p-col-12">
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                  <i class="pi pi-key"></i>                  
                </span>
                <InputNumber placeholder="Security Code" />
            </div>
        </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times-circle" @click="cancel" class="p-button-danger"/>
      <Button label="Place Order" icon="pi pi-check-circle" @click="placeOrder" autofocus />
    </template>
  </Dialog>
</template>

<script>
import { subscribe } from '../api/SubscriptionsApi.js'
import { PRODUCT_TYPE } from '../models.js'

export default {
  name: 'OrderModal',
  props: {
    isVisible: Boolean,
    selectedProduct: null,
    selectedTask: null
  },
  data() {
    return {
      expirationDate: null,
      displayedDay: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday'
      }
    }
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
      if (this.selectedTask == 'subscribe') {
        const reqObject = {
          seller_id: this.selectedProduct.seller_id,
          transaction_cost: this.selectedProduct.product_price,
          product_id: this.selectedProduct.product_id,
          product_quantity: this.selectedProduct.quantity,
          product_type: PRODUCT_TYPE['subscription'],
          user_id: JSON.parse(sessionStorage.getItem('currentUser')).user_id
        }
        subscribe(reqObject)
      }

      this.$emit('placeOrder');
    },
  }
}
</script>

<style scoped>
.p-fluid {
  width: 600px;
}

.p-field {
  text-align: start;
}

h2, h3 {
  text-align: start;
}
</style>