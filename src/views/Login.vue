<template>
    <div
        style="width: 100vw; height: 100vh; background-color: #ccc"
        class="d-flex justify-content-center align-items-center flex-column"
    >
        <div
            fluid
            class="d-flex justify-content-center align-items-center flex-column p-5"
            style="background-color: #fff; border-radius: 3px; box-shadow: 0 0 1px #ccc"
        >
            <b-img :src="require('../assets/login-img.png')" class="mb-2"></b-img>
            <b-form @submit.prevent="handleSubmit" class="p-1 w-100">
                <b-input-group size="sm" class="mb-2">
                    <b-input-group-prepend is-text class="me-1">
                        <b-icon icon="person-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" placeholder="Account" v-model="formData.account"></b-form-input>
                </b-input-group>

                <b-input-group size="sm" class="mb-2">
                    <b-input-group-prepend is-text class="me-1">
                        <b-icon icon="lock-fill"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="password" placeholder="Password" v-model="formData.password"></b-form-input>
                </b-input-group>
                <p v-if="errorMsg" class="text-center" style="font-size: 20px; color: red">error</p>
                <b-button type="submit" variant="primary" class="mt-2">登入</b-button>
            </b-form>
        </div>
    </div>
</template>
<script>
import md5 from 'js-md5'
import { apiLogin } from '../plugins/apiInstance'
export default {
    data() {
        return {
            errorMsg: '',
            formData: {
                account: '',
                password: '',
            },
        }
    },
    methods: {
        handleSubmit() {
            // apiLogin({
            //     headers: {
            //         account: this.formData.account,
            //         password: md5(this.formData.password),
            //     },
            // })
            //     .then((res) => {
            //         this.loginSuccess()
            //         console.log(res)
            //     })
            //     .catch((err) => {
            //         this.errorMsg = err.response.data
            //     })
            this.loginSuccess()
        },
        loginSuccess() {
            this.$router.push('/home')
        },
    },
}
</script>
<style scoped>
.container {
    height: 100vh;
    width: 100vw;
    background-color: #ccc;
}
</style>
