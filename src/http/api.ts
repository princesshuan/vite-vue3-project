import { AddUserModel } from './../views/system/User/type/user';
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

export interface UserListParm {
  deptId: number | string;
  currentPage: number;
  pageSize: number;
  loginName: string;
  total: number;
}

export const getImage = () => $http({ url: '/sysUser/image', method: 'post', responseType: 'blob'})
export const login = (data: any) => $http({ url: '/user/login', method: 'post', data})
export const getRoleList = () => $http({ url: '/getRoleList', method: 'get' })
export const getAuthorityList = () => $http({ url: '/getAuthority', method: 'get' })
export const getMenuList = () => $http({ url: '/sysUser/getMenuList', method: 'get' })
export const getDeptList = (data: ListParm) => $http({ url: `/department/list?searchName=${data.searchName}`, method: "get" }); 
export const getLeftDept = () => $http({ url: `/department/list`,method: "get"}); 
export const getDeptParent = () =>  $http({ url: "/department/parent", method: "get" });
export const saveDeptParent = (data: AddDeptModel) => $http({ url: "/department", method: "post", data });
export const updateDeptParent = (data: AddDeptModel) => $http({ url: "/department", method: "put", data });
export const deleteDeptParent = (id: number) => $http({ url: `/department/${id}`, method: "delete" });
export const getUserList = (data: UserListParm) =>
  $http({ url: `user/list`, method: "get", params: { ...data } });
export const saveUser = (data: AddUserModel) =>
  $http({ url: "/user", method: "post", data });
export const updateUser = (data: AddUserModel) =>
  $http({ url: "/user", method: "put", data });
export const deleteUser = (id: number) =>
  $http({ url: `/user/${id}`, method: "delete" });
