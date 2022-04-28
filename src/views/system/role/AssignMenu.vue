<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :visible="dialog.visible" :height="dialog.height" @onClose="onClose" @onConfirm="confirm">
    <template v-slot:content>
      <el-tree ref="assigntree" :data="assignTreeData.list" node-key="id" :props="defaultProps" default-expand-all empty-text="暂无数据" :show-checkbox="true" :highlight-current="true" :default-checked-keys="assignTreeData.assignTreeChecked" check-strictly></el-tree>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
  import SysDialog from '@/components/SysDialog.vue';
  import { reactive, ref } from 'vue';
  import { AssignTreeeParm } from './type/Role'
  import { DialogModel } from '../department/type/department';
  import { assignTree } from '@/http/api';
  import { ElTree } from 'element-plus';
  const defaultProps = reactive({
    children: 'children',
    label: 'label'
  })
  const assigntree = ref < InstanceType < typeof ElTree >> ()
  //树数据
  const assignTreeData = reactive({
    list: [],
    assignTreeChecked: []
  })
  const assignTreeModel = ref({
    list: [],
    roleId: ''
  })
  //注册事件
  const emit = defineEmits(['roleAssignSave'])
  //确定
  const confirm = () => {

    assignTreeModel.value.list = assigntree.value ?.getCheckedKeys()
    emit('roleAssignSave', assignTreeModel.value)
    onClose();
  }
  //显示弹框
  const show = (roleId: string, name: string) => {
    assignTreeModel.value.roleId = roleId
    //获取弹框树数据
    let parm = { roleId: roleId, userId: sessionStorage.getItem('userId') }
    getAssignTree(parm);
    //设置弹属性
    dialog.width = 300
    dialog.height = 420
    dialog.title = '为【' + name + '】分配权限'
    onShow();
  }
  //获取权限树数据
  const getAssignTree = async (parm: AssignTreeeParm) => {
    let res = await assignTree(parm);
    console.log('树数据加载完成')
    console.log(res)
    assignTreeData.list = res.data.listmenu
    assignTreeData.assignTreeChecked = res.data.checkList
  }
  //弹框
  const dialog = reactive < DialogModel > ({
    title: '',
    visible: false,
    width: 640,
    height: 250
  })
  //弹框取消
  const onClose = () => {
    dialog.visible = false;
  }

  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  //暴露方法
  defineExpose({
    show
  })
</script>
<style scoped lang='scss'>
</style>