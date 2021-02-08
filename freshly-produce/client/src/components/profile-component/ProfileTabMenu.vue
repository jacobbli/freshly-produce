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
    beforeMount() {
        this.$router.push({ name: 'MyDetail' });
    },
    data() {
		return {
			items: [
                {label: 'My Details', icon: 'pi pi-fw pi-home', to: '/mydetail'},
                // {label: 'My Subscription', icon: 'pi pi-fw pi-calendar', to: '/mysubscription'},
            ]
		}
	}
}
</script>
<style lang="">

</style>