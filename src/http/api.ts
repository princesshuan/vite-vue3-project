import $http from "./index";
import {AddDeptModel} from '@/views/system/department/type/department'
export interface loginData {
    username: string,
    password: string,
    code:string
}
export interface ListParm {
    searchName: string;
}

export const getImage = () => $http({ url: '/sysUser/image', method: 'post', responseType: 'blob'})
export const login = (data: any) => $http({ url: '/user/login', method: 'post', data})
export const getUserList = () => $http({ url: '/getUserList', method: 'get' })
export const getRoleList = () => $http({ url: '/getRoleList', method: 'get' })
export const getAuthorityList = () => $http({ url: '/getAuthority', method: 'get' })
export const getMenuList = () => $http({ url: '/sysUser/getMenuList', method: 'get' })
export const getDeptList = (data: ListParm) => $http({ url: `/department/list?searchName=${data.searchName}`, method: "get" }); 
export const getDeptParent = () =>  $http({ url: "/department/parent", method: "get" });
export const saveDeptParent = (data: AddDeptModel) => $http({ url: "/department", method: "post", data });
export const updateDeptParent = (data: AddDeptModel) => $http({ url: "/department", method: "put", data });
export const deleteDeptParent = (id: number) => $http({ url: `/department/${id}`, method: "delete" });
