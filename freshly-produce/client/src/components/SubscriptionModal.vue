<template>
  <Dialog 
    header="Please confirm your subscription" 
    :visible="isVisible" 
    :modal="true"
    :closable="false">
    {{product.product_name}}

    <template #footer>
      <Button label="No" icon="pi pi-times" @click="cancel" class="p-button-text"/>
      <Button label="Yes" icon="pi pi-check" @click="confirm" autofocus />
    </template>
  </Dialog>
</template>

<script>
export default {
  name: 'SubscriptionModal',
  props: {
    isVisible: Boolean,
    product: null
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    confirm() {
      let newProd = this.product
      newProd.is_subscribed = !newProd.is_subscribed
      this.$emit('confirm', newProd);
    },
  }
}
</script>

<style>

</style>