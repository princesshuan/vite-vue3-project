<template>
  <SysDialog :title="dialog.title" :visible="dialog.visible" :height="dialog.height" :width="dialog.width" @onClose='onClose' @onConfirm='confirm'>
    <template v-slot:content>
      <el-form :inline="true" ref="formRef" :model="dialogModel" :rules="rules" label-width="80px" class="demo-form-inline">
        <el-form-item label="上级部门" prop="parentName">
          <el-input v-model="dialogModel.parentName" readonly @click="openTree" />
        </el-form-item>
        <el-form-item label="部门名称" prop="name">
          <el-input v-model="dialogModel.name" />
        </el-form-item>
        <el-form-item label="部门编码">
          <el-input v-model="dialogModel.deptCode" />
        </el-form-item>
        <el-form-item label="部门电话">
          <el-input v-model="dialogModel.deptPhone" />
        </el-form-item>
        <el-form-item label="部门经理">
          <el-input v-model="dialogModel.manager" />
        </el-form-item>
        <el-form-item label="部门地址">
          <el-input v-model="dialogModel.deptAddress" />
        </el-form-item>
        <el-form-item label="部门序号">
          <el-input v-model="dialogModel.orderNum" />
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
  <tree-dep ref="TreeDepRef" @select="select"></tree-dep>
</template>
<script setup lang='ts'>
  import SysDialog from '@/components/SysDialog.vue';
  import { FormRules } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { DialogModel, AddDeptModel } from './type/department'
  import TreeDep from './TreeDep.vue';
  //表单验证
  const formRef = ref(null);
  const rules = reactive < FormRules > ({
    parentName: [{
      required: true,
      message: '请选择上级部门',
      trigger: ['blur', 'change'],
    }],
    name: { required: true, message: '请输入部门名称', trigger: 'blur' }
  })

  //表单绑定的数据
  let dialogModel = ref < AddDeptModel > ({
    type: "",
    id: "",
    pid: "",
    parentName: "",
    manager: "",
    deptAddress: "",
    deptPhone: "",
    name: "",
    deptCode: "",
    orderNum: ""
  })

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
    dialogModel.value = {
      type: "",
      id: "",
      pid: "",
      parentName: "",
      manager: "",
      deptAddress: "",
      deptPhone: "",
      name: "",
      deptCode: "",
      orderNum: ""
    }
    formRef.value?.clearValidate();
  }

  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  //注册事件
  const emit = defineEmits(['save'])
  //弹框确定返回表单值给父组件
  const confirm = async () => {
    await formRef.value.validate((valid: any) => {
      if (valid) {
        //返回值
        emit('save', dialogModel.value)
        //关闭弹框
        onClose();
      }
    })
  }
  const TreeDepRef = ref < { showParent: () => void } > ();
  const openTree = () => {
    TreeDepRef.value ?.showParent()
  }
  const select = (node: any) => {
    console.log(node)
    dialogModel.value.pid = node.parentId
    dialogModel.value.parentName = node.parentName
  }
  //父组件调用子组件展示弹框
  const show = (row: { type: string, data: AddDeptModel }) => {
    //显示弹框
    onShow();
    formRef.value?.clearValidate();
    //设置弹框的标题
    if (row.type == '编辑') {
      dialog.title = '编辑'
      dialogModel.value = {
        type: row.type,
        id: row.data.id,
        pid: row.data.pid,
        parentName: row.data.parentName,
        manager: row.data.manager,
        deptAddress: row.data.deptAddress,
        deptPhone: row.data.deptPhone,
        name: row.data.name,
        deptCode: row.data.deptCode,
        orderNum: row.data.orderNum
      }
    } else {
      dialog.title = '新增'
      dialogModel.value.type = row.type;
    }
  }

  defineExpose({
    show
  })
</script>
<style scoped lang='scss'>

</style>