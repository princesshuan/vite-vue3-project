<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :visible="dialog.visible" :height="dialog.height" @onClose="onClose" @onConfirm="confirm">
    <template v-slot:content>
      <el-table :height='250' size="mini" :data="assignRoleList.list" border stripe>
        <el-table-column width="50" align="center" label="选中">
          <template #default="scope">
            <el-radio v-model="selectRoleId" :label="scope.row.id" @change="getSlectRole(scope.row)">{{ "" }}</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="角色名称"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="parms.currentPage" :page-sizes="[10, 20, 40, 80, 100]" :page-size="parms.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="parms.total" background></el-pagination>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
  import { ref, onMounted, nextTick, reactive } from 'vue';
  import SysDialog from '@/components/SysDialog.vue';
  import { DialogModel } from '../department/type/department';
  import { assingRoleSave, getAssignRoleList, getRoleId } from '@/http/api';
  import { AssignRoleListParm } from './type/user';
  import { ElMessage } from 'element-plus';
  //表格高度
  const tableHeight = ref(0)
  //弹框属性
  //弹框
  const dialog = reactive < DialogModel > ({
    title: '',
    visible: false,
    width: 640,
    height: 300
  })
  //弹框取消
  const onClose = () => {
    dialog.visible = false;
  }

  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  //选中用户的id
  const selectUserId = ref < string | number > ('')
  //选中的角色id
  const selectRoleId = ref('');
  //表格数据
  const assignRoleList = reactive({
    list: []
  })
  //表格查询参数
  const parms = reactive < AssignRoleListParm > ({
    userId: sessionStorage.getItem("userId"),
    currentPage: 1,
    pageSize: 4,
    total: 0
  })
  //显示弹框
  const show = async (name: string, userId: number | number) => {
    selectRoleId.value = ''
    selectUserId.value = userId
    const res: any = await getRoleId(userId)
    if (res.data) {
      selectRoleId.value = res.data.roleId
    }
    dialog.title = '为【' + name + '】分配角色';
    onShow();
  }

  //确定
  const confirm = async () => {
    if (!selectRoleId.value) {
      ElMessage({
        message: '请选择角色',
        type: 'warning'
      })
      return;
    }
    const res: any = await assingRoleSave({ roleId: selectRoleId.value, userId: selectUserId.value })
    if (res && res.code == 200) {
      ElMessage({
        message: '分配成功',
        type: 'success'
      })
      onClose();
    }
  }
  //获取角色数据
  const getAssignList = async () => {
    let res: any = await getAssignRoleList(parms)
    if (res && res.code == 200) {
      assignRoleList.list = res.data.records;
      parms.total = res.data.total;
    }
  }
  //表格单选点击事件
  const getSlectRole = (row: any) => {
    selectRoleId.value = row.id
  }
  //页容量改变时触发
  const sizeChange = (size: number) => {
    parms.pageSize = size;
    getAssignList();
  }
  //页数改变时触发
  const currentChange = (page: number) => {
    parms.currentPage = page;
    getAssignList();
  }

  //暴露方法
  defineExpose({
    show
  })

  onMounted(() => {
    getAssignList()
    nextTick(() => {
      tableHeight.value = window.innerHeight - 690
    })
  })
</script>
<style scoped lang='scss'>

</style>