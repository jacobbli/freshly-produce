<template>
  <NavBar />
  <router-view ></router-view>
  <div v-if="this.$route['fullPath'] == '/'">
    <DiscountedProduce/>
  </div>

</template>

<script>
import NavBar from '../components/NavBar'
import DiscountedProduce from '../views/DiscountedProduce.vue'
export default {
  name: 'HomePage',
  components: {
    NavBar,
    DiscountedProduce
  }
}
</script>

<style>

</style>