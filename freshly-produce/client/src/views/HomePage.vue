<template>
  <NavBar />
  <router-view ></router-view>
  <div v-if="this.$route['fullPath'] == '/'">
    <CloseToExpiry/>
  </div>

</template>

<script>
import NavBar from '../components/NavBar'
import CloseToExpiry from '../views/CloseToExpiry.vue'
export default {
  name: 'HomePage',
  components: {
    NavBar,
    CloseToExpiry
  }
}
</script>

<style>

</style>