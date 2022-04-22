import $http from "./index";

interface loginData {
    username: string,
    password: string,
    code:string
}
export const getImage = () => $http({ url: '/sysUser/image', method: 'post', responseType: 'blob'})
export const login = (data: loginData) => $http({ url: '/user/login', method: 'post', data})
export const getList = (data: any) => $http({ url: '/getList', method: 'get', data })
export const getUserList = () => $http({ url: '/getUserList', method: 'get' })
export const getRoleList = () => $http({ url: '/getRoleList', method: 'get' })
export const getAuthorityList = () => $http({ url: '/getAuthority', method: 'get' })
export const getRouter = () => $http({ url: '/sysUser/getMenuList', method: 'get' })