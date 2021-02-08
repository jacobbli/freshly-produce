<template>
    <router-view
      v-slot="{Component}"
      :subscription-steps="subscriptionSteps"
      @prev-page="prevPage($event)"
      @next-page="nextPage($event)">
      <keep-alive>
          <component :is="Component" />
      </keep-alive>
    </router-view>
</template>

<script>

export default {
  name: 'SubscriptionCreationPage',
  data() {
    return {
      formObject: {},
      pageIndex: 0
    }
  },
  props: {
    subscriptionSteps: Array,
  },
  methods: {
    nextPage() {
        // for (let field in event.formData) {
        //     this.formObject[field] = event.formData[field];
        // }
        this.pageIndex += 1;
        this.$router.push(this.subscriptionSteps[this.pageIndex].to);
    },
    prevPage(event) {
        this.$router.push(this.subscriptionSteps[event.pageIndex].to);
    },
  },
  mounted: function() {
    this.$router.push('/my-offers/new-subscription/create');
  },
}
</script>

<style>
.steps {
  vertical-align: end;
}

</style>