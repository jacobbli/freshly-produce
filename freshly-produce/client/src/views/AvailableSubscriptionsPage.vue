<template>
  <div>
    <DataView :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
              </div>
          </div>
      </template>

      <template #grid="slotProps">
          <div class="p-col-3 p-p-4">
              <Card>
                  <template #header>
                      <img alt="user header" src="/images/temp/carrots.jpg">
                  </template>
                  <template #title>
                      {{slotProps.data.product_name}}
                  </template>
                  <template  #content>
                      <i class="pi pi-tag product-category-icon p-pr-2"></i><span class="product-category">{{slotProps.data.product_type}}</span>
                      <div class="product-price p-pr-4">${{slotProps.data.product_price}}</div>
                  </template>
                  <template #footer>
                    <Button 
                      v-if="slotProps.data.is_subscribed" 
                      disabled="disabled" 
                      icon="pi pi-times" 
                      label="You're already subscribed!" />
                    <Button v-else 
                      icon="pi pi-check" 
                      label="Subscribe"
                      @click="openOrderModal(slotProps.data, 'subscribe')" />
                  </template>
              </Card>
          </div>
      </template>
    </DataView>
    <order-modal
      :is-visible="orderModalIsVisible"
      :selected-product="selectedProduct"
      :selected-task="selectedTask"
      @cancel="closeOrderModal()"
      @placeOrder="placeOrder()" />
  </div>


</template>

<script>
import OrderModal from '../components/OrderModal.vue'

export default {
  name: 'AvailableSubscriptionsPage',
  components: {
    OrderModal
  },
  data() {
		return {
      layout: 'grid',
      sortKey: null,
      sortOrder: null,
      sortField: null,
      sortOptions: [
          {label: 'Price High to Low', value: '!product_price'},
          {label: 'Price Low to High', value: 'product_price'},
      ],
      orderModalIsVisible: false,
      selectedProduct: null,
      selectedTask: null,
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
          product_price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 2,
          product_name: "crrots",
          product_type: "food",
          product_price: 15.99,
          is_subscribed: true,
        },
        {
          product_id: 3,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_subscribed: true,
        },
        {
          product_id: 4,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 5,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_subscribed: false,
        },
        {
          product_id: 6,
          product_name: "carros",
          product_type: "food",
          product_price: 15.99,
          is_subscribed: false,
        },
      ]
		}
	},
  methods: {
    openOrderModal(product, task) {
      this.selectedProduct = product;
      this.selectedTask = task;
      this.orderModalIsVisible = true;
    },

    closeOrderModal() {
      this.orderModalIsVisible = false;
    },

    confirmModalAction(newProduct) {
      this.closeModal();
      const index = this.listProduct.findIndex(product => {
        return product.product_id == newProduct.product_id
      })
      this.listProduct[index] = newProduct;
    },
    placeOrder() {
      // todo: add to customer's subscribed items
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct[index].is_subscribed = true;
      this.closeOrderModal();
    }
  }
}
</script>

<style>


</style>