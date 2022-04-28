export interface RoleListParm {
  userId: string | number;
  currentPage: number;
  pageSize: number;
  total: number;
  name: string;
}
export interface RoleModel {
  id: number | string;
  createUser: number | string;
  name: string;
  remark: string;
  createTime: string;
  updateTime: string;
}
export interface AddRoleModel {
  type: string;
  id: number | string;
  createUser: number | string;
  name: string;
  remark: string;
}

export interface AssignTreeeParm {
  userId: string;
  roleId: string;
}
