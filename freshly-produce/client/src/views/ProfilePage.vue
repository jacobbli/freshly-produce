<template>
    <div id="profilePage">
        <div class="p-grid">
            <div v-if="currentUser" class="p-col-4">
                <Avatar id="avatarProfilePage" shape="circle" class="p-mt-4" label="P" size="xlarge"/>
                <h1>{{ currentUser.first_name + ' ' + currentUser.surname }}</h1>
                <h3>{{ currentUser.email }}</h3>
                <h3>{{ currentUser.address }}</h3>
            </div>
            <div class="p-col-8">
                <ProfileTabMenu/>
            </div>
        </div>
    </div>
</template>

<script>
import ProfileTabMenu from '../components/profile-component/ProfileTabMenu'
export default {
    name:'Profile',
    components: {
        ProfileTabMenu
    },
    computed: {
        currentUser: () => JSON.parse(sessionStorage.getItem('currentUser'))
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