export interface UserListParm {
  deptId: string | number;
  loginName: string;
  currentPage: number;
  pageSize: number;
  total: number;
}
export interface UserModel {
  id: string | number;
  deptId: string | number;
  deptName: string;
  email: string;
  loginName: string;
  mobile: string;
  nickName: string;
  password: string;
  username: string;
  sex: string;
}
export interface AddUserModel {
  type: string;
  id: string | number;
  deptId: string | number;
  deptName: string;
  email: string;
  loginName: string;
  mobile: string;
  nickName: string;
  password: string;
  username: string;
  sex: string;
}
