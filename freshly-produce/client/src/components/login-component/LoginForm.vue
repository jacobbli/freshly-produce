<template>
  <Card class="p-col-3">
    <template #title>
        Please Sign In
    </template>
    <template #content>
      <form class="login-form p-fluid">
        <div class="username-input p-field p-grid p-jc-center">
          <label 
            class="p-col-3 form-label"
            for="username">
            Username
          </label>
          <div class="p-col-6">
            <InputText 
              id="username" 
              type="username"
              autocomplete="on"
              v-model="loginObject.username"
              @keyup.enter="submitForm()" />
          </div>
        </div>
        <div class="password-input p-field p-grid p-jc-center">
          <label
            class="p-col-3 form-label"
            for="password">
            Password
          </label>
          <div class="p-col-6 ">
            <InputText
              id="password" 
              type="password"
              autocomplete="on"
              v-model="loginObject.password"
              @keyup.enter="submitForm()"/>
          </div>
        </div>
        <div class="login-button p-grid p-jc-center">
          <div class="p-col-fixed">
            <Button 
              label="Sign in"
              @click="submitForm()" />
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
import { login } from '../../api/UsersApi.js'

export default {
  name: 'LoginForm',
  
  data() {
		return {
      loginObject: {
        username: null,
        password: null,
      }
		}
	},
  methods: {
    submitForm() {
      if (this.loginObject.username && this.loginObject.password) {
        login(this.loginObject).then(() => {
          this.$router.push('/');
        });
      }
    }
  }
}

</script>

<style scoped>

</style>