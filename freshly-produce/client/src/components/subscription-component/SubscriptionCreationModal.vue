<template>
  <Dialog
    header="Add a new product for users to subscribe to:" 
    :visible="isVisible" 
    :modal="true"
    :closable="false"
    :contentStyle="{overflow: 'visible'}">
    <subscription-creation-page 
      :subscription-steps="subscriptionSteps" 
      @submitForm="confirmModalAction()" />
    <Button 
      label="Cancel"
      class="p-button-danger"
      @click="cancel"
      iconPos="right" />
    <Button 
      label="Next"
      @click="nextPage()" 
      icon="pi pi-angle-right" 
      iconPos="right" />
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
      pageIndex: 0,
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
    nextPage() {
      this.pageIndex += 1;
      this.$router.push(this.subscriptionSteps[this.pageIndex].to);
    },
    confirmModalAction() {
      this.$emit('confirm');
    },
    cancel() {
      this.$emit('cancel');
    },
  }
}
</script>

<style scoped>
button {
	margin-right: .5rem;
}

</style>