<template>
 <div class="layout-content" v-if="listProduct.length !== 0">
    <DataView :value="listProduct" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
      <template #header>
          <div class="p-grid p-nogutter">
              <div class="p-col-6" style="text-align: left">
                  <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange($event)"/>
              </div>
          </div>
      </template>

     <template #grid="slotProps">
          <div class="p-col-12 p-md-4">
            <div class="product-grid-item card">
                <div class="product-grid-item-content">
                    <img alt="user header" :src="slotProps.data.product_photo" />
                    <div class="product-name">{{slotProps.data.product_name}}</div>
                    <div class="product-description">{{slotProps.data.product_description}}</div>
                </div>
                <div class="product-grid-item-bottom">
                    <span class="product-price">${{slotProps.data.product_price}}</span>
                    <Button 
                      icon="pi pi-times" 
                      class="p-button-danger" 
                      label="Unsubscribe" 
                      @click="openConfirmationModal(slotProps.data, 'unsubscribe')" />
                </div>
            </div>
        </div>
      </template>
    </DataView>

    <action-confirmation-modal
      :is-visible="confirmationModalIsVisible"
      :selected-product="selectedProduct"
      :selected-task="selectedTask"
      @cancel="closeConfirmationModal()"
      @unsubscribe="unsubscribe()" />
  </div>
  <div v-else>
    <h2>You haven't subscribed to any products yet!</h2>
  </div>
</template>

<script>
import ActionConfirmationModal from '../ActionConfirmationModal.vue'
import { getSubscribedProducts } from '../../api/SubscriptionsApi.js'
import { PRODUCT_TYPE } from '../../models'

export default {
  name: 'CustomerSubscriptionsPage',
  components: {
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
      confirmationModalIsVisible: false,
      selectedProduct: null,
      selectedTask: null,
      listproduce:[
        "berries.jpg",
        "blueberries.jpg",
        "broccoli.jpg",
        "carrots.jpg"
      ],
      listProduct: [],
      listphotos:[
        "blueberries.jpg",
        "broccoli.jpg",
        "carrots.jpg",
        "fruit.jpg",
        "root.jpg",
        "tuber.jpg"
      ],
		}
	},
  methods: {
    openConfirmationModal(product, task) {
      this.selectedProduct = product;
      this.selectedTask = task;
      this.confirmationModalIsVisible = true;
    },
    closeConfirmationModal() {
      this.confirmationModalIsVisible = false;
    },

    unsubscribe() {
      let index = this.listProduct.findIndex(element => {
        return element.product_id == this.selectedProduct.product_id;
      })
      this.listProduct.splice(index, 1);
      this.closeConfirmationModal();
    }
  },
  mounted: function() {
    var reqForm = {
      user_id: JSON.parse(sessionStorage.getItem('currentUser')).user_id,
      product_type: PRODUCT_TYPE['subscription']
    };
    getSubscribedProducts(reqForm).then(res => {
      this.listProduct = res;
    }).catch(err => {
      console.error(err);
      this.listProduct = [];
    });
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

.layout-content .card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
</style>