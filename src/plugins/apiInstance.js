import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://192.168.40.16',
})
export const apiLogin = (config) => instance.get('/iomr6sys/auth/login', config)
export const apiLogout = (config) => instance.get('/iomr6sys/auth/logout', config)
export const getEmployee = (config) => instance.get('/iomr6res/basic/employee', config)
export const getAccount = (config) => instance.get('/iomr6sys/auth/account', config)
