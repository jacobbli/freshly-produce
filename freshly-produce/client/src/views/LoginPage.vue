<template>
  <div class="container p-grid p-ai-center p-jc-center">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  components: {
  },
  mounted: function() {
    this.$router.push({name: 'RoleSelectionForm'});
  }
}
</script>

<style scoped>
.p-grid {
  margin: 0;
}

.container {
  height: 100vh
}
</style>