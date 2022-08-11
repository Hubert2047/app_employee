<template>
    <b-container class="bg-secondary" fluid>
        <b-row>
            <b-col>
                <h1>AIoM Solution</h1>
            </b-col>
            <b-col cols="1" class="ms-auto">
                <b-dropdown id="dropdown-right" right variant="primary" class="m-2">
                    <b-dropdown-item href="#">個人資料</b-dropdown-item>
                    <b-dropdown-item href="#">作業人員</b-dropdown-item>
                    <b-dropdown-item @click="logOut" href="#">登出</b-dropdown-item>
                </b-dropdown>
            </b-col>
        </b-row>
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
