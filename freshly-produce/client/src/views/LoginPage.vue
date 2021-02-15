<template>
  <div class="container p-grid p-ai-center p-jc-center">
      <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '../components/login-component/LoginForm.vue';

export default {
  name: 'LoginPage',
  components: {
    LoginForm
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