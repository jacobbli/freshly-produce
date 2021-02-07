<template>
  <Menubar :model="subscriptionMenuItems" />
  <div class="p-grid p-p-4">
    <div class="p-col-3" v-for='(product, index) in this.listProduct' :key='product.product_id'>
        <Card>
        <template #header>
            <img alt="user header" src="/images/temp/berries.jpg">
        </template>
        <template #title>
            {{product.product_name}}
        </template>
        <template #content>
            Food Type: {{product.product_type}}
        </template>
        <template #footer>
            <Button v-if="product.is_published" icon="pi pi-times" class="p-button-warning" label="Unpublish" @click="unPublish(index)" />
            <Button v-else icon="pi pi-check" label="Publish" @click="publish(index)" />
        </template>
      </Card>
    </div>
  </div>

  <subscription-creation-modal
    :is-visible="modalIsVisible"
    v-on:cancel="closeModal()"
    @confirm="confirmModalAction($event)" />

</template>

<script>
import SubscriptionCreationModal from '../components/subscription-component/SubscriptionCreationModal.vue'

export default {
  name: 'FarmerSubscriptionsPage',
  components: {
    SubscriptionCreationModal
  },
  data() {
		return {
      modalIsVisible: false,
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
      ],
      subscriptionMenuItems: [
        {
          label:'Add Product',
          icon:'pi pi-fw pi-plus',
          command: () => this.openModal()
        }
      ]
		}
	},
  methods: {
    publish(index) {
      this.listProduct[index].is_published = true;
    },
    unPublish(index) {
      this.listProduct[index].is_published = false;
    },
    openModal() {
      this.modalIsVisible = true;
    },

    closeModal() {
      this.modalIsVisible = false;
    },

    confirmModalAction() {
      this.closeModal();
    }
  }
}
</script>

<style>

</style>