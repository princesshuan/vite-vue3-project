<template>
  <SysDialog :title="dialog.title" :visible="dialog.visible" :height="dialog.height" :width="dialog.width" @onClose='onClose' @onConfirm='confirm'>
    <template v-slot:content>
      <el-form :inline="true" ref="roleFormRef" :model="dialogModel" :rules="rules" label-width="80px" class="demo-form-inline">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="dialogModel.name" />
        </el-form-item>
        <el-form-item label="角色备注" prop="remark">
          <el-input v-model="dialogModel.remark" />
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>
<script setup lang='ts'>
  import SysDialog from '@/components/SysDialog.vue';
  import { ElForm, FormRules } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { AddRoleModel } from './type/Role'
  import { DialogModel } from '../department/type/department';
  //表单验证
  const roleFormRef = ref < InstanceType < typeof ElForm >> ();
  const rules = reactive < FormRules > ({
    name: { required: true, message: '请输入角色名称', trigger: 'blur' }
  })

  //表单绑定的数据
  let dialogModel = ref < AddRoleModel > ({
    type: "",
    id: '',
    createUser: '',
    name: '',
    remark: ''
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
      id: '',
      createUser: '',
      name: '',
      remark: ''
    }
  }

  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  //注册事件
  const emit = defineEmits(['save'])
  //弹框确定返回表单值给父组件
  const confirm = async () => {
    await roleFormRef.value.validate((valid: any) => {
      if (valid) {
        //返回值
        emit('save', dialogModel.value)
        //关闭弹框
        onClose();
      }
    })
  }

  //父组件调用子组件展示弹框
  const show = (row: { type: string, data: AddRoleModel }) => {
    //显示弹框
    onShow();
    //设置弹框的标题
    if (row.type == '编辑') {
      dialog.title = '编辑'
      dialogModel.value = {
        type: row.type,
        id: row.data.id,
        createUser: row.data.createUser,
        remark: row.data.remark,
        name: row.data.name
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