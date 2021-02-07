<template>
    <div id="profilePage">
        <NavBar />
        <div class="p-grid">
            <div class="p-col-4"> 
                <Avatar id="avatarProfilePage" shape="circle" class="p-mt-4" label="P" size="xlarge"/> 
                <h1>Jameson Cheong</h1>
                <h3>JamesonCheong@email.com</h3>
                <h3>1251 Candy Lane street</h3>
            </div>
            <div class="p-col-8">
                <ProfileTabMenu/>

                <router-view />
            </div>
        </div>
    </div>
</template>

<script>

import NavBar from '../components/NavBar'
import ProfileTabMenu from '../components/profile-component/ProfileTabMenu'
export default {
    name:'Profile',
    components: {
        NavBar,
        ProfileTabMenu,
    },
    data() {
		return {
			
		}
	}
}
</script>
<style>
    #avatarProfilePage{
        width: 250px;
        height: 250px;
        font-size: 100px
    }
</style>