<template>
  <div class="container">
    <div class="p-d-inline-flex p-flex-col ">
      <router-view v-slot="{Component}" :formData="formObject" @prev-page="prevPage($event)" @next-page="nextPage($event)" @complete="complete">
        <keep-alive>
            <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
    <div class="p-grid p-jc-center steps">
      <Steps 
        :model="subscriptionSteps" 
        :readonly="true" 
        class="steps"/>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
  name: 'SubscriptionCreationPage',
  components: {
    NavBar
  },
  data() {
		return {
			subscriptionSteps: [{
        label: 'Create Subscription Plan',
        to: '/subscription/create'
      },
      {
        label: 'Set Frequency',
        to: '/subscription/frequency'
      },
      {
        label: 'Choose Product',
        to: '/subscription/product'
      }],
      formObject: {}
		}
	},
  methods: {
    nextPage(event) {
        for (let field in event.formData) {
            this.formObject[field] = event.formData[field];
        }
        
        this.$router.push(this.subscriptionSteps[event.pageIndex + 1].to);
    },
    prevPage(event) {
        this.$router.push(this.subscriptionSteps[event.pageIndex - 1].to);
    },
    complete() {
        this.$toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + this.formObject.firstname + ' ' + this.formObject.lastname + ' your order completed.'});
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}

.steps {
  width: 100%;
}

.p-steps .p-steps-item .p-menuitem-link {
  background-color: #F8F9FA !important
}	

</style>