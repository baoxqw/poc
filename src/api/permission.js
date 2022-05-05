import axios from '@/config/httpConfig'

export function fetchPermission() {
    return axios.get('/user/info')
}

// 获取次级权限列表
export function getNextLevel(id) {
    return axios.get(`/permission/level?id=${id}`)
}
export function login(data) {
    return axios.post('/user/login', data)
}
