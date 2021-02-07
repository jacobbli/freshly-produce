<template>
    <!-- <Menu class=" p-shadow-0" :model="menuitems" /> -->
    <aside>
     heello   
    </aside>
</template>
<script>
export default {
    data(){
        return{
            menuitems: [
                {
                    items:[
                        {
                            label:'Close-To-Expiry',
                            icon:'pi pi-clock',
                            to: ''
                        },
                        {
                            label:'Subscription',
                            icon:'pi pi-bell',
                            to: ''
                        },                        
                        {
                            label:'My Subscription',
                            icon:'pi pi-tags',
                            to: ''
                        },
                    ]
                }
            ]
        }
    }
}
</script>
<style >
    
</style>