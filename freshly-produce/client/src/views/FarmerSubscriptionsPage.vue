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
            @click="openSubscriptionCreationModal()"/>
        </div>
      </div>
    </template>

    <template #grid="slotProps">
      <div class="p-col-12 p-lg-4 p-xl-3">
        <div class="product-grid-item card">
          <div class="product-grid-item-top">
            <div>
              <i class="pi pi-tag product-category-icon"></i>
              <span class="product-category">{{slotProps.data.product_category}}</span>
            </div>
            <span>
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
            <subscription-product-description :selected-product="slotProps.data" />
          </div>
          <div class="product-grid-item-bottom">
            <span class="product-price">${{slotProps.data.product_price}}</span>
            <Button
              v-if="slotProps.data.is_published"
              icon="pi pi-times-circle"
              class="p-button-warning"
              label="Unpublish"
              @click="openConfirmationModal(slotProps.data, 'unpublish')" />
            <Button
              v-else
              icon="pi pi-check-circle"
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
    <Button @click="openSubscriptionCreationModal()">
      <i class="pi pi-plus" style="fontSize: 2rem"></i>
      <span class="empty-button-label">
        You haven't added any subscriptions.
        <br>
        Click here to add a product and start selling!
      </span>
    </Button>
  </div>
    <subscription-creation-modal
      :is-visible="modalIsVisible"
      @submit-form="createSubscription()"
      @close-modal="closeSubscriptionCreationModal()" />

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
import SubscriptionCreationModal from '../components/SubscriptionCreationModal.vue'
import SubscriptionProductDescription from '../components/SubscriptionProductDescription.vue'

import ActionConfirmationModal from '../components/ActionConfirmationModal.vue'
import EditModal from '../components/EditModal.vue'
import { getOfferedSubscriptions } from '../api/SubscriptionsApi.js'
import { PRODUCT_TYPE } from '../models'

export default {
  name: 'FarmerSubscriptionsPage',
  components: {
    SubscriptionCreationModal,
    ActionConfirmationModal,
    EditModal,
    SubscriptionProductDescription
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
      listProduct: [],
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
        return `Delivers on the first ${this.displayedDate[date]} of each month`;
      } else if (frequency == 'Bi-weekly') {
        return `Delivers on the FIRST and THIRD ${this.displayedDate[date]}s of each month`;
      } else {
        return `Delivers each week on ${this.displayedDate[date]}`;
      }
    },
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

    openSubscriptionCreationModal() {
      this.modalIsVisible = true;
    },

    closeSubscriptionCreationModal() {
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

    createSubscription() {
      this.updateOfferedSubscriptionsList();
      this.closeSubscriptionCreationModal();
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
  justify-content: space-between;
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
  width: 75%;
  height: 250px;
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

.empty-button-label {
  text-align: start;
  margin-left: 10px;
}
</style>