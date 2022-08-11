import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PortalVue from 'portal-vue'
import axios from 'axios'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import vueConfig from '../vue.config'
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(IconsPlugin)
Vue.use(PortalVue)
Vue.prototype.axios = axios

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
