<template>
  <Card class="p-col-3">
    <template #title>
        I am a...
    </template>
    <template #content>
        <div class="p-grid p-jc-center">
          <div class="p-col-4">
            <router-link to="/login/auth">
              <Button label="Farmer"/>
            </router-link>
          </div>
          <div class="p-col-4">
            <router-link to="/login/auth">
              <Button label="Customer"/>
            </router-link>
          </div>
        </div>
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