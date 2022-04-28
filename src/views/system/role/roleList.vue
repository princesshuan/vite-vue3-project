<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" label-width="80px" :inline="true" size="mini">
      <el-form-item label="角色名称">
        <el-input placeholder="请输入角色名称" v-model="listParm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button :icon="Close" style="color: #FF7670;" @click="resetBtn">重置</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="roleTable.list" border stripe>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="remark" label="角色备注"></el-table-column>
      <el-table-column label="操作" align="center" width="350">
        <template #default="scope">
          <el-button type="primary" size="mini" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
          <el-button type="primary" size="mini" :icon="Setting" @click="assignPermission(scope.row)">分配权限</el-button>
          <el-button type="danger" size="mini" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage" :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background></el-pagination>
  </el-main>
  <add-and-edit-vue ref="addRoleRef" @save="save" />
  <assign-menu ref="AssignMenuRef" @roleAssignSave="roleAssignSave"></assign-menu>
</template>
<script setup lang="ts">
  import { ref, nextTick, onMounted, reactive } from 'vue';
  import { Search, Close, Plus, Delete, Edit, Setting } from '@element-plus/icons';
  import { deleteRole, getRoleList, saveaAsignTree, saveRole, updateRole } from '@/http/api';
  import { AddRoleModel, RoleListParm, RoleModel } from './type/role';
  import { ElMessage, ElMessageBox } from 'element-plus';
  import AddAndEditVue from './AddAndEdit.vue';
  import AssignMenu from './AssignMenu.vue';
  //表格高度
  const tableHeight = ref(0);

  //表格数据
  const roleTable = reactive({
    list: []
  })

  //表格查询参数
  const listParm = reactive < RoleListParm > ({
    userId: sessionStorage.getItem('userId'),
    currentPage: 1,
    pageSize: 10,
    total: 0,
    name: ''
  })
  //获取表格数据
  const getRole = async () => {
    let res: any = await getRoleList(listParm)
    if (res && res.code == 200) {
      roleTable.list = res.data.records;
      listParm.total = res.data.total;
    }
  }
  //搜索按钮
  const searchBtn = () => {
    getRole()
  }
  //重置按钮
  const resetBtn = () => {
    listParm.name = '';
    getRole()
  }
  //页容量改变触发
  const sizeChange = (size: number) => {
    listParm.pageSize = size;
    getRole();
  }
  //页数改变触发
  const currentChange = (page: number) => {
    listParm.currentPage = page;
    getRole();
  }
  // 弹框组件ref属性
  const addRoleRef = ref < { show: (row: {}) => void } > ();
  const AssignMenuRef = ref < { show: (roleId: string | number, name: string) => void } > ()
  const addBtn = () => {
    addRoleRef.value ?.show({ type: '新增' })
  }
  //编辑
  const editBtn = (row: RoleModel) => {
    addRoleRef.value ?.show({ type: '编辑', data: row })
  }
  //删除
  const deleteBtn = (id: number) => {
    ElMessageBox.confirm(
        '确认删除该部门吗?',
        '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        deleteRole(id).then((res: any) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            getRole()
          }
        })

      })
  }
  //保存
  const save = (model: AddRoleModel) => {
    console.log('保存')
    console.log(model)
    if (model.type == '新增') {
      saveRole(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '新增成功！',
            type: 'success',
          })
          getRole()
        }
      })
    } else {
      updateRole(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
          getRole()
        }
      })
    }

  }
  //分配权限
  const assignPermission = (row: RoleModel) => {
    AssignMenuRef.value ?.show(row.id, row.name)
  }

  const roleAssignSave = (model: any) => {
    console.log(model, "model")
    saveaAsignTree(model).then((res: any) => {
      if (res && res.code === 200) {
        ElMessage({
          message: '分配成功！',
          type: 'success',
        })
        getRole()
      }
    })
  }

  onMounted(() => {
    getRole()
    nextTick(() => {
      tableHeight.value = window.innerHeight - 220
    })
  })
</script>