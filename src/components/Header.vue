<template>
    <b-container class="bg-secondary d-flex align-items-center justify-content-between" fluid>
        <h1 class="mb-0 logo">AIoM Solution</h1>
        <b-dropdown id="dropdown-right" right variant="primary" class="m-2">
            <b-dropdown-item href="#">個人資料</b-dropdown-item>
            <b-dropdown-item href="#">作業人員</b-dropdown-item>
            <b-dropdown-item @click="logOut" href="#">登出</b-dropdown-item>
        </b-dropdown>
    </b-container>
</template>
<script>
import { apiLogout } from '../plugins/apiInstance'

export default {
    data() {
        return {}
    },
    methods: {
        logOut() {
            apiLogout()
                .then((res) => {
                    this.$router.push('/')
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    },
}
</script>
<style>
@media screen and (max-width: 425px) {
    .logo {
        font-size: 1.75rem;
    }
}
</style>
