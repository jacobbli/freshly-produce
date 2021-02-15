<template>
  <div v-if="selectedProduct" class="product-grid-item-content">
      <img  alt="user header" :src="selectedProduct.product_photo" style="width: 50%"/>
      <div class="product-name">{{selectedProduct.product_name}}</div>
      <div class="product-description">{{selectedProduct.product_description}}</div>
      <div class="quantity"> 
        <h4>Subscription Quantity:</h4>
        {{selectedProduct.quantity + ' ' + selectedProduct.unit }} 
      </div>
      <div class="delivery-frequency">
        <h4>
          <i class="pi pi-clock"></i>
          Delivery Frequency:
        </h4>
        {{setDeliveryFrequencyDescription(selectedProduct.frequency, selectedProduct.delivery_day)}}
      </div>
  </div>
</template>

<script>

export default {
  name: 'SubscriptionProductDescription',
  props: {
    selectedProduct: {
      product_photo: '',
      product_name: '',
      product_description: '',
      quantity: null,
      unit: '',
      frequency: '',
      delivery_day: '',
    }
  },
  data() {
		return {
      displayedDate: {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday'
      }
		}
	},
  methods: {
    setDeliveryFrequencyDescription(frequency, date) {
      if (frequency == 'Monthly') {
        return `First ${this.displayedDate[date]} of each month`;
      } else if (frequency == 'Bi-weekly') {
        return `First and third ${this.displayedDate[date]}s of each month`;
      } else {
        return `Every ${this.displayedDate[date]}`;
      }
    },
  }
}
</script>

<style scoped>
.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

h4 {
  margin-bottom: 0;
}

.product-category-icon {
	vertical-align: middle;
	margin-right: .5rem;
}

.product-category {
	font-weight: 600;
	vertical-align: middle;
}

.product-grid-item {
	margin: .5rem;
	border: 1px solid #dee2e6;
}
.product-grid-item-top {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: .5rem;
}

.product-grid-item-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: .5rem;
}

.product-grid-item-content {
  text-align: center;
}

.product-grid-item-content img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  width:  100px;
  height: 125px;
  margin: 2rem 0;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
}

.layout-content .card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

.no-subscriptions-label {
  margin-top: 300px;
}
</style>