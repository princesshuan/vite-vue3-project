<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible" @onClose='onClose' @onConfirm='confirm'>
    <template v-slot:content>
      <el-form :inline="true" ref="formRef" :model="dialogModel" :rules="rules" label-width="80px" class="demo-form-inline">
        <el-form-item label="所属部门" prop="deptName">
          <el-input v-model="dialogModel.deptName" readonly @click="openTree" />
        </el-form-item>
        <el-form-item label="姓名" prop="username">
          <el-input v-model="dialogModel.username" />
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="dialogModel.mobile" />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="dialogModel.nickName" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="dialogModel.email" />
        </el-form-item>
        <el-form-item label="登录名" prop="loginName">
          <el-input v-model="dialogModel.loginName" />
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="dialogModel.sex">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
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
  import { DialogModel } from '../department/type/department';
  import { AddUserModel } from './type/user';
  import TreeDep from '../department/TreeDep.vue'
  //表单验证
  const formRef = ref(null);
  const rules = reactive < FormRules > ({
    deptName: [{
      required: true,
      message: '请选择所属部门',
      trigger: 'change'
    }],
    username: { required: true, message: '请输入名称', trigger: 'blur' },
    mobile: { required: true, message: '请输入电话', trigger: 'blur' },
    loginName: { required: true, message: '请输入登录名', trigger: 'blur' },
    sex: { required: true, message: '请选择性别', trigger: 'change' },
  })

  //表单绑定的数据
  let dialogModel = ref < AddUserModel > ({
    type: '',
    id: '',
    deptId: '',
    deptName: '',
    email: '',
    loginName: '',
    mobile: '',
    nickName: '',
    password: '',
    username: '',
    sex: ''
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
    formRef.value.resetFields()
  }

  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  const TreeDepRef = ref < { showParent: () => void } > ();
  const openTree = () => {
    TreeDepRef.value ?.showParent()
  }
  const select = (node: any) => {
    console.log(node)
    dialogModel.value.deptId = node.parentId
    dialogModel.value.deptName = node.parentName
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
  //父组件调用子组件展示弹框
  const show = (row: { type: string, data: AddUserModel }) => {
    //显示弹框
    console.log(row, 'row')
    onShow();
    //设置弹框的标题
    if (row.type == '编辑') {
      dialog.title = '编辑'
      dialogModel.value = {
        type: row.type,
        id: row.data.id,
        deptId: row.data.deptId,
        deptName: row.data.deptName,
        email: row.data.email,
        loginName: row.data.loginName,
        mobile: row.data.mobile,
        nickName: row.data.nickName,
        password: row.data.password,
        username: row.data.username,
        sex: row.data.sex
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