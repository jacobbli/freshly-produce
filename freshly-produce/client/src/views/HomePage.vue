<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from '../components/NavBar'

export default {
  name: 'HomePage',
  components: {
    NavBar,
  },
}
</script>

<style>

</style>