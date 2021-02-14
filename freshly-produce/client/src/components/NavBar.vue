<template >
    <div id="navbar" >
        <Sidebar class="p-sidebar-sm" v-model:visible="visibleLeft">
            <img alt="logo" src="/images/freshlyproduce.png" height="30" class="p-mx-4">
            <Menu class="p-m-0 p-shadow-0" :model="menuitems" />
        </Sidebar>
        <Menubar>
            <template #start>
            {{myCart}}
                <Button  icon="pi pi-bars" @click="visibleLeft = true" />
                <img id="freshlyLogo" @click="goToHomePage" alt="logo" src="/images/freshlyproduce.png" height="40" class="p-mx-4">
            </template>
            <template #end>
                <div class="p-grid">
                    <div class="p-col-6 p-pr-0">
                        <i id="cartIcon" class="pi pi-shopping-cart p-mr-4" style="font-size: 1.7rem" @click="goToCart"></i>
                    </div>
                    <div class="p-col-6 p-pl-0 p-pr-4" >
                        <Avatar label="P" shape="circle"  size="medium" @click="toggle" aria-haspopup="true" aria-controls="overlay_tmenu" />
                        
                    </div>
                </div>
                <TieredMenu id="overlay_tmenu" ref="menu" :model="itemsAvatar" :popup="true" />
            
            </template>
        </Menubar>
    </div>
</template>

<script>

export default {

  methods:{
      goToHomePage(){
          this.$router.push({ name: 'DiscountedProduce' });
      },        
      goToCart(){
          this.$router.push({ name: 'Cart'});
      },
      toggle(event) {
          this.$refs.menu.toggle(event);
      },
      isUserFarmer(){
        if(JSON.parse(sessionStorage.getItem('currentUser')).role != 1){
          return false
        }else{
          return true
        }
      }
  },
  data() {
    return {
      visibleLeft : false,
      isFarmer: true,
      props: {
        myCart: Object,
      },
      menuitems: [
        {
          label:'Discounted Produce',
          icon:'pi pi-clock',
          to: '/discounted-produce',
        },                   
        {
          label:'Available Subscriptions',
          icon:'pi pi-bell',
          to: '/available-subscriptions'
        },
        {
          label:'My Offered Subscriptions',
          icon:'pi pi-tags',
          to: '/my-offers',
          visible: () => this.isUserFarmer()
        },
        {
          label:'My Dicounted Produce',
          icon:'pi pi-apple',
          to: '/my-dicounted-produce',
          visible: () => this.isUserFarmer()
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
          icon:'pi pi-fw pi-power-off',
          to: '/login',
          command: () => sessionStorage.removeItem('currentUser')
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

    #navbar #cartIcon{
        cursor: pointer;
    }

    #navbar .p-avatar{
        background-color: #33864B;
        color: #000000;
        cursor: pointer;
    }

</style>