<template>
  <Dialog
    header="Add a new product for users to subscribe to:" 
    :visible="isVisible" 
    :modal="true"
    :dismissableMask="true"
    :contentStyle="{overflow: 'visible'}">
    <subscription-creation-page 
      :subscription-steps="subscriptionSteps" 
      @submitForm="confirmModalAction()" />
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
			subscriptionSteps: [{
        label: 'Create Subscription Plan',
        to: '/my-offers/new-subscription/create'
      },
      {
        label: 'Set Frequency',
        to: '/my-offers/new-subscription/frequency'
      },
      {
        label: 'Choose Product',
        to: '/my-offers/new-subscription/product'
      }],
      formObject: {}
		}
	},
  methods: {
    confirmModalAction() {
      this.$emit('confirm');
    }
  }
}
</script>

<style>


</style>