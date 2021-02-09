<template>
  <Dialog
    header="Add a new product for your customers to subscribe to:" 
    :visible="isVisible" 
    :modal="true"
    :closable="false"
    :contentStyle="{overflow: 'visible'}">
    <subscription-creation-page 
      :subscription-steps="subscriptionSteps"
      @on-submit="confirm"
      @cancel="cancel"/>
    <Steps 
    :model="subscriptionSteps" 
    :readonly="false"/>
  </Dialog>
</template>

<script>
import SubscriptionCreationPage from '../../views/SubscriptionCreationPage.vue'

export default {
  name: 'SubscriptionCreationModal',
  components: {
    SubscriptionCreationPage
  },
  props: {
    isVisible: Boolean,
  },
  data() {
		return {
			subscriptionSteps: [
        {
          label: 'Add Product Information',
          to: '/my-offers/new-subscription/create'
        },
        {
          label: 'Set Subscription Frequency',
          to: '/my-offers/new-subscription/frequency'
        },
      ],
      productObject: {},
		}
	},
  methods: {
    confirm() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
  }
}
</script>

<style scoped>

</style>