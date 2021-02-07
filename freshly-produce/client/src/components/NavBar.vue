<template >
    <div id="navbar">
        <Menubar>
            <template #start>
                <Button  icon="pi pi-bars" @click="visibleLeft = true" />
                <img alt="logo" src="/images/freshlyproduce.png" height="40" class="p-mx-4">
            </template>
        </Menubar>
          <Sidebar class="p-sidebar-sm" v-model:visible="visibleLeft">
            <img alt="logo" src="/images/freshlyproduce.png" height="30" class="p-mx-4">
            <Menu class="p-pt-4 p-m-0 p-shadow-0" :model="menuitems" />
        </Sidebar>
    </div>
</template>
<script>

export default {

  data() {
    return {
      visibleLeft : false,
      menuitems: [
        {
          label:'Close-To-Expiry',
          icon:'pi pi-clock',
          to: ''
        },
        {
          label:'Available Subscriptions',
          icon:'pi pi-bell',
          to: '/available-subscriptions'
        },
        {
          label:'My Subscriptions',
          icon:'pi pi-tags',
          to: '/my-subscriptions'
        },
        {
          label:'Create Subscription',
          icon:'pi pi-tags',
          to: '/subscriptions/create'
        },
        {
          label:'My Offered Subscriptions',
          icon:'pi pi-tags',
          to: '/my-offers'
        }
      ]
    }
  }
}
</script>
<style >
    #navbar .p-sidebar .p-menubar{
        width: 100%;
    }
    #navbar .p-menubar .p-button {
        background-color: #F8F9FA;
        color: green;
        border-color: #F8F9FA;
    }
    #navbar .pi-bars{
        font-size: 1.5rem;
    }

    #navbar .p-menu{
        width: 100%;
        border-color: #FFFFFF;
    }

    #navbar .p-menuitem{
        height: 50px;
    }

</style>