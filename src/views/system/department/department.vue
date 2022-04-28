<template>
  <el-main>
    <el-form :inline="true" :model="searchFrom" label-width="80px" class="demo-form-inline">
      <el-form-item label="部门名称">
        <el-input v-model="searchFrom.searchName" clearable placeholder="请输入部门名称" />
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">搜索</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData.list" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" style="width: 100%">
      <el-table-column prop="name" label="部门名称" />
      <el-table-column prop="deptCode" label="部门编码" />
      <el-table-column prop="deptPhone" label="部门电话" />
      <el-table-column label="操作" width='200' align='center'>
        <template #default="scope">
          <el-button type="primary" :icon="Edit" @click="editBtn(scope.row)">编辑</el-button>
          <el-button type="danger" :icon="Delete" @click="deleteBtn(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <add-and-edit-vue ref="addDeptRef" @save="save"></add-and-edit-vue>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue'
  import { getDeptList, saveDeptParent, deleteDeptParent, updateDeptParent } from '@/http/api'
  import { DeptModel, AddDeptModel } from './type/department'
  import AddAndEditVue from './AddAndEdit.vue';
  import { ElMessage, ElMessageBox } from 'element-plus';
  const searchFrom = reactive({
    searchName: ''
  })

  //定义表格数据
  const tableData = reactive({
    list: []
  })
  //获取表格数据
  const getDept = async () => {
    const res: any = await getDeptList(searchFrom);
    if (res && res.code == 200) {
      console.log(res.data)
      tableData.list = res.data;
    }
  }

  const addDeptRef = ref < { show: (row: {}) => void } > ();
  //搜索
  const searchBtn = () => {
    getDept()
  }
  //新增
  const addBtn = () => {
    addDeptRef.value ?.show({ type: '新增' });
  }
  //编辑
  const editBtn = (row: DeptModel) => {
    addDeptRef.value ?.show({ type: '编辑', data: row })
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
        deleteDeptParent(id).then((res: any) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            getDept()
          }
        })

      })
  }
  //保存
  const save = (model: AddDeptModel) => {
    console.log('保存')
    console.log(model)
    if (model.type == '新增') {
      saveDeptParent(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '新增成功！',
            type: 'success',
          })
          getDept()
        }
      })
    } else {
      updateDeptParent(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
          getDept()
        }
      })
    }

  }

  //首次加载数据
  onMounted(() => {
    getDept()
  })
</script>