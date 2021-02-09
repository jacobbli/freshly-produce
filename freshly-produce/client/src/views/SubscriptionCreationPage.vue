<template>
    <router-view
      v-slot="{Component}"
      :subscription-steps="subscriptionSteps"
      :product-object="productObject"
      @submit-form="onSubmit"
      @next-page="nextPage">
      <keep-alive>
          <component :is="Component" />
      </keep-alive>
    </router-view>
</template>

<script>
export default {
  name: 'SubscriptionCreationPage',
  props: {
    subscriptionSteps: Array,
  },
  data() {
    return {
      pageIndex: 0,
      productObject: {},
    }
  },
  methods: {
    nextPage(productObject) {
      this.pageIndex += 1;
      this.productObject = productObject
      this.$router.push(this.subscriptionSteps[this.pageIndex].to);
    },
    onSubmit() {
      this.pageIndex = 0;
      this.$emit('onSubmit');
    },
  },
  mounted: function() {
    this.$router.push('/my-offers/new-subscription/create');
  },
}
</script>
