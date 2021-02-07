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
            <p>Food Type: {{product.product_type}}</p>
            <p>Price: {{product.price}}</p>
        </template>
        <template #footer>
          <Button v-if="product.is_subscribed" icon="pi pi-times" class="p-button-warning" label="Unsubscribe" @click="openModal(product)" />
          <Button v-else icon="pi pi-check" label="Subscribe" @click="openModal(product)" />
        </template>
      </Card>

      <subscription-modal
        :is-visible="modalIsVisible"
        :product="selectedProduct"
        v-on:cancel="closeModal()"
        v-on:confirm="confirmModalAction($event)" />
    </div>
  </div>
</template>

<script>
import SubscriptionModal from '../components/SubscriptionModal.vue'

export default {
  name: 'AvailableSubscriptionsPage',
  components: {
    SubscriptionModal
  },
  data() {
		return {
      modalIsVisible: false,
      selectedProduct: Object,
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
          price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 2,
          product_name: "crrots",
          product_type: "food",
          price: 15.99,
          is_subscribed: true,
        },
        {
          product_id: 3,
          product_name: "carots",
          product_type: "food",
          price: 15.99,
          is_subscribed: true,
        },
        {
          product_id: 4,
          product_name: "carots",
          product_type: "food",
          price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 5,
          product_name: "carots",
          product_type: "food",
          price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 6,
          product_name: "carros",
          product_type: "food",
          price: 15.99,
          is_subscribed: false,
        },
      ]
		}
	},
  methods: {
    openModal(product) {
      this.selectedProduct = product;
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    },

    confirmModalAction(newProduct) {
      this.closeModal();
      const index = this.listProduct.findIndex(product => {
        return product.product_id == newProduct.product_id
      })
      this.listProduct[index] = newProduct;
    }
  }
}
</script>

<style>

</style>