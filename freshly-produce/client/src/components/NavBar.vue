<template >
    <div id="navbar" >
        <Sidebar class="p-sidebar-sm" v-model:visible="visibleLeft">
            <img alt="logo" src="/images/freshlyproduce.png" height="30" class="p-mx-4">
            <Menu class="p-m-0 p-shadow-0" :model="menuitems" />
        </Sidebar>
        <Menubar>
            <template #start>
                <Button  icon="pi pi-bars" @click="visibleLeft = true" />
                <img id="freshlyLogo" @click="goToHomePage" alt="logo" src="/images/freshlyproduce.png" height="40" class="p-mx-4">
            </template>
            <template #end>
                <i class="pi pi-shopping-cart p-mr-4 " style="font-size: 1.25rem" v-badge="2" @click="goToCart"></i>
                <Avatar label="P" shape="circle" class="p-mr-2" size="medium" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
                <TieredMenu id="overlay_tmenu" ref="menu" :model="itemsAvatar" :popup="true" />
            </template>
        </Menubar>
    </div>
</template>

<script>

export default {

    methods:{
        goToHomePage(){
            this.$router.push({ name: 'Home' });
        },        
        goToCart(){
            this.$router.push({ name: 'Cart' });
        }
        toggle(event) {
            this.$refs.menu.toggle(event);
        }
  },
  data() {
    return {
      visibleLeft : false,
      menuitems: [
        {
          label:'Close-To-Expiry',
          icon:'pi pi-clock',
          to: '/closetoexpiry'
        },                   
        {
          label:'Available Subscriptions',
          icon:'pi pi-bell',
          to: '/available-subscriptions'
>>>>>>> main
        },
        {
          label:'My Offered Subscriptions',
          icon:'pi pi-tags',
          to: '/my-offers'
        }
      ],
      itemsAvatar: [
        {
          label:'Profile',
          icon:'pi pi-fw pi-user',
          to: '/profile/mydetail'
        },
        {
          separator:true
        },
        {
          label:'Log Out',
          icon:'pi pi-fw pi-power-off'
        }
      ]
    }
  },

    
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
    
    #navbar #freshlyLogo{
        cursor: pointer;
    }

    #navbar .p-avatar{
        background-color: #33864B;
        color: #000000;
        cursor: pointer;
    }

</style>