<template>
  <Card>
    <template #title>
      <img alt="logo" src="/images/freshlyproduce.png" height="50" class="p-mx-4 p-mb-4">
      <div>
        Please Sign In
      </div>
    </template>
    <template #content>
      <form class="p-fluid">
        <div class="p-field p-grid">
          <div class="p-col-8">
            <InputText 
              placeholder="Username"
              type="username"
              autocomplete="on"
              v-model="loginObject.username"
              @keyup.enter="submitForm()" />
          </div>
        </div>
        <div class="p-field p-grid">
          <div class="p-col-8">
            <InputText
              placeholder="Password"
              id="password" 
              type="password"
              autocomplete="on"
              v-model="loginObject.password"
              @keyup.enter="submitForm()"/>
          </div>
        </div>
        <div class="submit-button">
          <div>
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
.p-fluid {
  width: 100%;
}
.p-field {
  justify-content: center;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-img {
  margin-bottom: 10px;
}
</style>