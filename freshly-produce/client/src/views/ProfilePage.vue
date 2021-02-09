<template>
    <div id="profilePage">
        <div class="p-grid">
            <div class="p-col-4"> 
                <Avatar id="avatarProfilePage" shape="circle" class="p-mt-4" label="P" size="xlarge"/> 
                <h1>{{ first_name + ' ' + surname }}</h1>
                <h3>{{ email }}</h3>
                <h3>{{ address }}</h3>
            </div>
            <div class="p-col-8">
                <ProfileTabMenu/>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProfileTabMenu from '../components/profile-component/ProfileTabMenu'
export default {
    name:'Profile',
    components: {
        ProfileTabMenu
    },
    computed: {
        ...mapGetters('users', {
            first_name: 'getFirstName',
            surname: 'getSurname',
            email: 'getEmail',
            address: 'getAddress'
        })
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