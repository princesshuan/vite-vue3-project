<template>
  <el-container :style="{ height: containerHeight + 'px' }">
    <el-aside width="200px" style="border-right: 1px solid #dfe6ec;">
      <!-- Aside content -->
      <LeftTree ref="userLeftTree" @treeClick="treeClick"></LeftTree>
    </el-aside>
    <el-main>
      <!-- 搜索栏 -->
      <el-form :model="listParm" label-width="80px" :inline="true">
        <el-form-item label="用户名">
          <el-input v-model="listParm.loginName" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button :icon="Search" @click="searchBtn">搜索</el-button>
          <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
        </el-form-item>
      </el-form>
      <!-- 用户表格 -->
      <el-table :height="tableHeight" :data="tableData.list" border stripe>
        <el-table-column prop="loginName" label="用户名"></el-table-column>
        <el-table-column prop="deptName" label="所属部门"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" width="350" label="操作">
          <template #default="scope">
            <el-button type="primary" :icon="Edit" @click='editBtn(scope.row)'>编辑</el-button>
            <el-button type="primary" :icon="Edit" @click='assignRoleBtn(scope.row)'>分配角色</el-button>
            <el-button type="danger" :icon="Delete" @click='deleteBtn(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage" :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" :total="listParm.total" background></el-pagination>
    </el-main>
  </el-container>
  <add-and-edit ref="addUserRef" @save="save"></add-and-edit>
  <AssignRole ref = "assignRoleRef"></AssignRole>
</template>
<script setup lang="ts">
  import { Search, Plus, Delete, Edit } from '@element-plus/icons';
  import LeftTree from './LeftTree.vue';
  import { ref, onMounted, nextTick, reactive } from 'vue'
  import { AddUserModel, UserListParm, UserModel } from './type/user';
  import { deleteUser, getUserList, saveUser, updateUser } from '@/http/api'
  import { ElMessage, ElMessageBox } from 'element-plus';
  import AddAndEdit from './AddAndEdit.vue';
  import AssignRole from './AssignRole.vue';
  //容器高度
  const containerHeight = ref(0);
  //表格高度
  const tableHeight = ref(0);

  //列表参数
  const listParm = reactive < UserListParm > ({
    deptId: 1,
    currentPage: 1,
    pageSize: 10,
    loginName: '',
    total: 0
  })
  //表格数据
  const tableData = reactive({
    list: []
  })

  //获取表格数据
  const getUser = async () => {
    let res: any = await getUserList(listParm)
    // console.log(res)
    if (res && res.code == 200) {
      tableData.list = res.data.records
      listParm.total = res.data.total;
    }
  }
  //树点击数据
  const treeClick = (deptId: number) => {
    console.log('父组件收到')
    //设置点击的部门id
    listParm.deptId = deptId;
    //获取部门列表
    getUser();
  }
  //页容量改变触发
  const sizeChange = (size: number) => {
    listParm.pageSize = size;
    getUser();
  }
  //页数改变触发
  const currentChange = (page: number) => {
    listParm.currentPage = page
    getUser();
  }
  const addUserRef = ref < { show: (row: {}) => void } > ();
  const assignRoleRef = ref < { show: (name: string,id:string | number)=> void } > ()
  //搜索
  const searchBtn = () => {
    getUser()
  }
  //新增
  const addBtn = () => {
    addUserRef.value ?.show({ type: '新增' });
  }
  //编辑
  const editBtn = (row: UserModel) => {
    addUserRef.value ?.show({ type: '编辑', data: row })
  }
  const assignRoleBtn = (row:UserModel) => {
   assignRoleRef.value ?.show(row.loginName,row.id)
  }
  //删除
  const deleteBtn = (id: number) => {
    ElMessageBox.confirm(
        '确认删除该用户吗?',
        '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        deleteUser(id).then((res: any) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            getUser()
          }
        })

      })
  }
  //保存
  const save = (model: AddUserModel) => {
    console.log('保存')
    console.log(model)
    if (model.type == '新增') {
      saveUser(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '新增成功！',
            type: 'success',
          })
          getUser()
        }
      })
    } else {
      updateUser(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
          getUser()
        }
      })
    }

  }
  onMounted(() => {
    getUser();
    nextTick(() => {
      containerHeight.value = window.innerHeight - 100
      tableHeight.value = window.innerHeight - 220
    })
  })
</script>