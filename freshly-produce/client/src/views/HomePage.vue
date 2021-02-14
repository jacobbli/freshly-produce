<template>
  <NavBar />
  <router-view @updateCartParent="updateparent" ></router-view>
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
  },
  data(){
    return{
      myCart: []
    }
  },
  beforeMount() {
    this.myCart = JSON.parse(localStorage.getItem('myCart'))[0]
  },
  methods: {
    updateparent(variable) { 
      this.myCart = variable 
    }
  },
}
</script>

<style>

</style>