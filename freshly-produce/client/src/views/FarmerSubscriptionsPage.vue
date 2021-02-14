<template>
    <div class="layout-content">
    <h1>My Offered Subscriptions</h1>
    <DataView v-if="listProduct.length > 0" :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown
                    v-model="sortKey"
                    :options="sortOptions"
                    optionLabel="label"
                    placeholder="Sort By Price"
                    @change="onSortChange($event)"/>
              </div>
              <div class="p-col-6" style="text-align: right">
                <Button
                  label="Add Product"
                  icon="pi pi-plus"
                  class="p-button"
                  @click="openModal()"/>
              </div>
          </div>
      </template>

      <template #grid="slotProps">
          <div class="p-col-12 p-md-4">
            <div class="product-grid-item card">
                <div class="product-grid-item-top">
                    <span class="product-category">
                      <Button
                        class="p-button-sm edit-button"
                        icon="pi pi-pencil"
                        @click="openEditModal(slotProps.data)" />
                      <Button
                        class="p-button-sm p-button-danger"
                        icon="pi pi-times"
                        @click="openConfirmationModal(slotProps.data, 'delete')"/>
                    </span>
                </div>
                <div class="product-grid-item-content">
                    <img alt="user header" :src="slotProps.data.product_photo" />
                    <div class="product-name">{{slotProps.data.product_name}}</div>
                    <div class="product-description">{{slotProps.data.product_description}}</div>
                </div>
                <div class="product-grid-item-bottom">
                    <span class="product-price">${{slotProps.data.product_price}}</span>
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
                </div>
            </div>
        </div>
      </template>
    </DataView>
      <div
      v-else
      class="no-subscriptions-button">
    <Button @click="openModal()">
      You haven't added any subscriptions.
      <br>
      <br>
      Click here to add a product and start selling!</Button>
    </div>
    <subscription-creation-modal
      :is-visible="modalIsVisible"
      v-on:cancel="closeModal()"
      @confirm="confirmModalAction($event)"
      @cancel="closeConfirmationModal()" />

    <edit-modal
      :is-visible="editModalIsVisible"
      :selected-product="selectedProduct"
      @cancel="closeEditModal()"
      @editProduct="editProduct()" />

    <action-confirmation-modal
      :is-visible="confirmationModalIsVisible"
      :selected-product="selectedProduct"
      :selected-task="selectedTask"
      @cancel="closeConfirmationModal()"
      @change-published-status="changePublishedStatus()"
      @delete="deleteProduct()" />
  </div>
</template>

<script>
import SubscriptionCreationModal from '../components/subscription-component/SubscriptionCreationModal.vue'
import ActionConfirmationModal from '../components/ActionConfirmationModal.vue'
import EditModal from '../components/EditModal.vue'
import { getOfferedSubscriptions } from '../api/SubscriptionsApi.js'
import { PRODUCT_TYPE } from '../models'

export default {
  name: 'FarmerSubscriptionsPage',
  components: {
    SubscriptionCreationModal,
    ActionConfirmationModal,
    EditModal
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
      editModalIsVisible: false,
      selectedProduct: null,
      selectedTask: null,
      listProduct: []
		}
	},
  methods: {
    changePublishedStatus() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct[index].is_published = !this.listProduct[index].is_published;
      this.closeConfirmationModal();
    },

    editProduct() {
      this.updateOfferedSubscriptionsList();
      this.closeEditModal();
    },

    deleteProduct() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct.splice(index, 1);
      this.closeConfirmationModal();
    },

    openEditModal(product) {
        this.selectedProduct = product
        this.editModalIsVisible = true;
    },


    openConfirmationModal(product, task) {
      this.selectedProduct = product;
      this.selectedTask = task;
      this.confirmationModalIsVisible = true;
    },

    closeConfirmationModal() {
      this.confirmationModalIsVisible = false;
    },

    closeEditModal() {
      this.editModalIsVisible = false;
    },

    openModal() {
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    },

    updateOfferedSubscriptionsList() {
      const reqForm = {
        user_id: JSON.parse(sessionStorage.getItem('currentUser')).user_id,
        product_type: PRODUCT_TYPE['subscription']
      };
      getOfferedSubscriptions(reqForm).then(res => {
        this.listProduct = res;
      }).catch(err => {
        console.error(err);
      });
    },

    confirmModalAction() {
      this.updateOfferedSubscriptionsList();
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
  },
  mounted: function() {
    this.updateOfferedSubscriptionsList();
  }
}
</script>

<style scoped>
.p-dropdown {
    width: 14rem;
    font-weight: normal;
}

.product-name {
	font-size: 1.5rem;
	font-weight: 700;
}

.product-description {
	margin: 0 0 1rem 0;
}

.edit-button {
  margin-right: .5rem;
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

img {
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin: 2rem 0;
}

.product-grid-item-content {
  text-align: center;
}

.product-grid-item-content img {
  width: 75%
}

.product-price {
  font-size: 1.5rem;
  font-weight: 600;
}

.no-subscriptions-button {
  margin-top: 300px;
}

.layout-content .card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}

</style>