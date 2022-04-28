<template style='padding:0px 20px;'>
  <el-main>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="menuTable.list" style="width: 100%" row-key="id" border default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="label" label="菜单名称" />
      <el-table-column prop="type" label="类型">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '0'">目录</el-tag>
          <el-tag v-if="scope.row.type == '1'" type="success">菜单</el-tag>
          <el-tag v-if="scope.row.type == '2'" type="danger">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="图标">
        <template #default="scope">
        <el-icon>
          <component :is="scope.row.icon" />
        </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="路由名称" />
      <el-table-column prop="path" label="路由地址" />
      <el-table-column prop="url" label="组件路径" />
      <el-table-column label="操作" width="210" align="center">
        <template #default="scope">
          <el-button type="primary" size="mini" @click="editBtn(scope.row)" :icon="Edit">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteBtn(scope.row.id)" :icon="Close">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>
  <update-menu ref="addMenuRef" @save="save"></update-menu>
</template>
<script setup lang="ts">
  import { deleteMenu, getMenuList2, updateMenu } from '@/http/api';
import {  Edit, Close } from '@element-plus/icons';
import { ElMessage, ElMessageBox } from 'element-plus';
  import { ref, onMounted, nextTick, reactive } from 'vue';
import { AddMenuModel } from './type/menu';
import UpdateMenu from './UpdateMenu.vue';
  //表格的高度
  const tableHeight = ref(0)
  //表格数据获取
  //表格数据
  const menuTable = reactive({
    list: []
  })

  //获取表格数据
  const getMenuTable = async () => {
    let res: any = await getMenuList2()
    if (res && res.code == 200) {
      menuTable.list = res.data;
    }
  }
 // 弹框组件ref属性
 const addMenuRef = ref < { show: (data:{})=> void } > ();
  //编辑
  const editBtn = (row: any) => {
    addMenuRef.value ?.show(row)
  }
  //删除
  const deleteBtn = (id: number) => {
    ElMessageBox.confirm(
        '确认删除该行吗?',
        '系统提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        deleteMenu(id).then((res: any) => {
          if (res && res.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            })
            getMenuTable()
          }
        })

      })
  }
  //保存
  const save = (model: AddMenuModel) => {
    console.log('保存')
    console.log(model)

      updateMenu(model).then((res: any) => {
        if (res && res.code === 200) {
          ElMessage({
            message: '修改成功！',
            type: 'success',
          })
          getMenuTable()
        }
      })
    

  }

  onMounted(() => {
    getMenuTable()
    nextTick(() => {
      tableHeight.value = window.innerHeight - 200
    })
  })
</script>
<style scoped lang="scss">
  .icons {
    width: 24px;
    height: 18px;
    margin-right: 5px;
  }
</style>