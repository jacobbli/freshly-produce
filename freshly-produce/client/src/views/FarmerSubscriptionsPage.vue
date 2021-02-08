<template>
  <div>
    <DataView :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
              </div>
              <div class="p-col-6" style="text-align: right">
                <Button label="Add Product" icon="pi pi-plus" class="p-button" @click="openModal()"/>
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
                      v-if="slotProps.data.is_published"
                      icon="pi pi-times"
                      class="p-button-warning"
                      label="Unpublish"
                      @click="openConfirmationModal(slotProps.data, 'unpublish')" />
                    <Button
                      v-else
                      icon="pi pi-check"
                      label="Publish"
                      @click="openConfirmationModal(slotProps.data, 'publish')" />
                    <Button
                      icon="pi pi-times"
                      class="p-button-danger"
                      label="Delete"
                      @click="openConfirmationModal(slotProps.data, 'delete')" />
                  </template>
              </Card>
          </div>
      </template>
    </DataView>
    <subscription-creation-modal
      :is-visible="modalIsVisible"
      v-on:cancel="closeModal()"
      @confirm="confirmModalAction($event)"
      @cancel="closeConfirmationModal()" />

    <action-confirmation-modal
      :is-visible="confirmationModalIsVisible"
      :selected-product="selectedProduct"
      :selected-task="selectedTask"
      @cancel="closeConfirmationModal()"
      @publish="publish()"
      @unpublish="unpublish()"
      @delete="deleteProduct()" />
  </div>
</template>

<script>
import SubscriptionCreationModal from '../components/subscription-component/SubscriptionCreationModal.vue'
import ActionConfirmationModal from '../components/ActionConfirmationModal.vue'

export default {
  name: 'FarmerSubscriptionsPage',
  components: {
    SubscriptionCreationModal,
    ActionConfirmationModal
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
      modalIsVisible: false,
      confirmationModalIsVisible: false,
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
          is_published: false,
        },
        {
          product_id: 2,
          product_name: "crrots",
          product_type: "food",
          product_price: 15.99,
          is_published: true,
        },
        {
          product_id: 3,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_published: true,
        },
        {
          product_id: 4,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_published: false,
        },
        {
          product_id: 5,
          product_name: "carots",
          product_type: "food",
          product_price: 15.99,
          is_published: false,
        },
        {
          product_id: 6,
          product_name: "carros",
          product_type: "food",
          product_price: 15.99,
          is_published: false,
        },
      ],
		}
	},
  methods: {
    publish() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct[index].is_published = true;
      this.closeConfirmationModal();
    },

    unpublish() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct[index].is_published = false;
      this.closeConfirmationModal();
    },

    deleteProduct() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct.splice(index, 1);
      this.closeConfirmationModal();
    },

    openConfirmationModal(product, task) {
      this.selectedProduct = product;
      this.selectedTask = task;
      this.confirmationModalIsVisible = true;
    },

    closeConfirmationModal() {
      this.confirmationModalIsVisible = false;
    },

    openModal() {
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    },

    confirmModalAction() {
      this.closeModal();
    },

    onSortChange(event){
      const value = event.value.value;
      const sortValue = event.value;

      if (value.indexOf('!') === 0) {
          this.sortOrder = -1;
          this.sortField = value.substring(1, value.length);
          this.sortKey = sortValue;
      }
      else {
          this.sortOrder = 1;
          this.sortField = value;
          this.sortKey = sortValue;
      }
    }
  }
}
</script>

<style scoped>
.p-card-footer button {
	margin-right: .5rem;
}
</style>