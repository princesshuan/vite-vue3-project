import {
  AddUserModel,
  AssignRoleListParm,
} from "./../views/system/User/type/user";
import $http from "./index";
import { AddDeptModel } from "@/views/system/department/type/department";
import {
  AddRoleModel,
  AssignTreeeParm,
  RoleListParm,
} from "@/views/system/Role/type/role";
import { AddMenuModel } from "@/views/system/Menu/type/menu";
export interface loginData {
  username: string;
  password: string;
  code: string;
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
// 登录接口
export const getImage = () =>
  $http({ url: "/sysUser/image", method: "post", responseType: "blob" });
export const login = (data: any) =>
  $http({ url: "/user/login", method: "post", data });

export const getMenuList = () =>
  $http({ url: "/sysUser/getMenuList", method: "get" });
//   部门接口
export const getDeptList = (data: ListParm) =>
  $http({
    url: `/department/list?searchName=${data.searchName}`,
    method: "get",
  });
export const getLeftDept = () =>
  $http({ url: `/department/list`, method: "get" });
export const getDeptParent = () =>
  $http({ url: "/department/parent", method: "get" });
export const saveDeptParent = (data: AddDeptModel) =>
  $http({ url: "/department", method: "post", data });
export const updateDeptParent = (data: AddDeptModel) =>
  $http({ url: "/department", method: "put", data });
export const deleteDeptParent = (id: number) =>
  $http({ url: `/department/${id}`, method: "delete" });

// 用户接口
export const getUserList = (data: UserListParm) =>
  $http({ url: `user/list`, method: "get", params: { ...data } });
export const saveUser = (data: AddUserModel) =>
  $http({ url: "/user", method: "post", data });
export const updateUser = (data: AddUserModel) =>
  $http({ url: "/user", method: "put", data });
export const deleteUser = (id: number) =>
  $http({ url: `/user/${id}`, method: "delete" });
export const resetData = () =>
  $http({ url: "/backup/restore", method: "post" });
export const getAssignRoleList = (data: AssignRoleListParm) =>
  $http({
    url: "/user/getRolistForAssign",
    method: "get",
    params: { ...data },
  });
export const getRoleId = (userId: string | number) =>
  $http({ url: `/user/getRoleIdByUserId/${userId}`, method: "get" });
export const assingRoleSave = (data: any) =>
  $http({ url: "/user/assingRole", method: "post", data });
export const getUserId = (userId: string | number) =>
  $http({ url: `/user/getUserId?${userId}`, method: "get" });

// 角色接口
export const getRoleList = (data: RoleListParm) =>
  $http({ url: `role/list`, method: "get", params: { ...data } });
export const saveRole = (data: AddRoleModel) =>
  $http({ url: "/role", method: "post", data });
export const updateRole = (data: AddRoleModel) =>
  $http({ url: "/role", method: "put", data });
export const deleteRole = (id: number) =>
  $http({ url: `/role/${id}`, method: "delete" });
export const assignTree = (data: AssignTreeeParm) =>
  $http({
    url: `/role/getAssignPermissionTree`,
    method: "get",
    params: { ...data },
  });

export const saveaAsignTree = (data: any) =>
  $http({
    url: `/role/roleAssignSave`,
    method: "post",
    data,
  });

//权限接口
export const getMenuList2 = () => $http({ url: `menu/list`, method: "get" });
export const updateMenu = (data: AddMenuModel) =>
  $http({ url: "/menu", method: "put", data });
export const deleteMenu = (id: number) =>
  $http({ url: `/menu/${id}`, method: "delete" });
export const getMenuParent = () =>
  $http({ url: "/menu/parent", method: "get" });
