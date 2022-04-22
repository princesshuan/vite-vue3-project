import axios from "axios";
import { ElMessage } from 'element-plus'

//创建HTTP实例
const $http = axios.create({
    baseURL: "http://119.45.133.128:8098/api",
    timeout: 2000,
    headers: {
        "Content-Type": "application/json;charset=utf-8"
    }
})

//请求拦截
$http.interceptors.request.use(config => {
    config.headers = config.headers || {}
    if (sessionStorage.getItem('token')) {
        config.headers.token = sessionStorage.getItem('token') || ''
    }
    return config
})


//响应{code:200,data:{},msg:"请求成功"}

$http.interceptors.response.use(res => {
    const dataType = Object.prototype.toString.call(res.data)
    const code: number = dataType == '[object Object]' ? res.data.code :res.status
    if (code !== 200) {
        ElMessage.error(res.data.msg)
        return Promise.reject(res.data)
    }
    return res.data

}, err => {
    console.log(err)
    // ElMessage.error(err)
})

export default $http