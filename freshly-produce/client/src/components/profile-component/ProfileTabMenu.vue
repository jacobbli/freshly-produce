<template>
    <div id="ProfileTabMenu">
        <TabMenu class="p-p-4" :model="items" />
        <router-view />
    </div>
</template>
<script>
import TabMenu from 'primevue/tabmenu';
export default {
  components:{
      TabMenu,
  },
  data() {
    return {
      items: [
        {label: 'My Details', icon: 'pi pi-fw pi-home', to: 'mydetail'},
        {label: 'My Subscription', icon: 'pi pi-fw pi-calendar', to: 'my-subscriptions'}
      ]
    }
  }
}
</script>
<style lang="">

</style>