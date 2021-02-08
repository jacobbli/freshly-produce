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
              autocomplete="on"/>
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
              autocomplete="on"/>
          </div>
        </div>
        <div class="login-button p-grid p-jc-center">
          <div class="p-col-fixed">
            <router-link to="/">
              <Button label="Sign in"/>
            </router-link>
          </div>
        </div>
      </form>
    </template>
  </Card>
</template>

<script>
export default {
  name: 'LoginForm',
  
  data() {
		return {
      username: null,
      password: null,
		}
	}
}

</script>

<style scoped>
a {
    text-decoration: none;
}

</style>