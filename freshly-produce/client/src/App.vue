<template>
    <Toast position="top-right" />
    <router-view/>
</template>

<script>

export default {
  name: 'App',
  beforeMount() {
    if(JSON.parse(sessionStorage.getItem('currentUser')) == null){
      this.$router.push({ name: 'LoginPage' });
    }
  },
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

body {
  margin: 0px;
  background-color: #F8F9FA;
  overflow-x: hidden;
}
</style>
