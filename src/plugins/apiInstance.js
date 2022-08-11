import axios from 'axios'
const instance = axios.create({
    // baseURL: 'http://localhost:8080/#/',
})

export const apiLogin = (config) => instance.get('/iomr6sys/auth/login', config)
export const apiLogout = (config) => instance.get('/iomr6sys/auth/logout', config)
export const getEmployee = (config) => instance.get('/iomr6res/basic/employee', config)
export const getAccount = (config) => instance.get('/iomr6sys/auth/account', config)
export const createEmployee = (data, config) => instance.post('/iomr6res/basic/employee', data, config)
export const updateEmployee = (data, config) => instance.put('/iomr6res/basic/employee', data, config)
export const deleteEmployee = (config) => instance.delete('/iomr6res/basic/employee', config)
