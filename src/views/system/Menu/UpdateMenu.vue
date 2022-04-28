<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible" @onConfirm="confrim" @onClose="onClose">
    <template v-slot:content>
      <el-form :model="addMenuModel" ref="addMenuForm" :rules="rules" label-width="80px" size="mini">
        <el-row>
          <el-col :span="24" :offset="0">
            <el-form-item prop='type' label="菜单类型">
              <el-radio-group v-model="addMenuModel.type">
                <el-radio :label="'0'">目录</el-radio>
                <el-radio :label="'1'">菜单</el-radio>
                <el-radio :label="'2'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop='parentName' label="上级菜单" readonly @click="openTree">
              <el-input type="hidden" v-model="addMenuModel.parentId"></el-input>
              <el-input v-model="addMenuModel.parentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop='label' label="菜单名称">
              <el-input v-model="addMenuModel.label"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="权限字段">
              <el-input v-model="addMenuModel.code"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单序号">
              <el-input v-model="addMenuModel.orderNum"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row v-if="addMenuModel.type !== '2'">
          <el-col :span="12" :offset="0">
            <el-form-item prop="path" label="路由地址">
              <el-input v-model="addMenuModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="路由名称">
              <el-input v-model="addMenuModel.name"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row v-if="addMenuModel.type !== '2'">
          <el-col :span="12" :offset="0">
            <el-form-item label="菜单图标">
              <el-input v-model="addMenuModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0" v-if="addMenuModel.type !== '0'">
            <el-form-item prop="url" label="组件路径">
              <el-input v-model="addMenuModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
  <tree-menu ref="TreeMenuRef" @select="select"></tree-menu>
</template>
<script setup lang='ts'>
  import SysDialog from '@/components/SysDialog.vue';
  import { FormRules } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { DialogModel } from '../department/type/department';
  import { AddMenuModel } from './type/menu';
  import TreeMenu from './TreeMenu.vue';
  //注册事件
  const emit = defineEmits(['save'])
  const rules = reactive < FormRules > ({
    type: [{
      required: true,
      trigger: "change",
      message: "请选择菜单类型",
    }, ],
    parentName: [{
      required: true,
      trigger: "change",
      message: "请选择上级菜单",
    }, ],
    label: [{
      required: true,
      trigger: "change",
      message: "请填写菜单名称",
    }, ],
    name: [{
      required: true,
      trigger: "change",
      message: "请填写路由名称",
    }, ],
    path: [{
      required: true,
      trigger: "change",
      message: "请填写路由路径",
    }, ],
    url: [{
      required: true,
      trigger: "change",
      message: "请填写组件路径",
    }, ],
    code: [{
      required: true,
      trigger: "change",
      message: "请填写权限字段",
    }, ]
  })
  //表单绑定的数据
  let addMenuModel = ref < AddMenuModel > ({
    type: "",
    id: 0,
    editType: '',
    parentId: '',
    parentName: '',
    label: '',
    icon: '',
    name: '',
    path: '',
    url: '',
    code: '',
    orderNum: ''
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
    addMenuModel.value = {
      type: "",
      id: 0,
      editType: '',
      parentId: '',
      parentName: '',
      label: '',
      icon: '',
      name: '',
      path: '',
      url: '',
      code: '',
      orderNum: ''
    }
  }
  const addMenuForm = ref(null);
  //弹框显示
  const onShow = () => {
    dialog.visible = true;
  }

  const TreeMenuRef = ref < { showParent: ()=> void } > ();
    const openTree = () => {
      TreeMenuRef.value ?.showParent()
    }
    const select = (node: any) => {
    console.log(node)
    addMenuModel.value.parentId = node.id
    addMenuModel.value.parentName = node.parentName
    }

  //确定
  const confrim = () => {
    emit('save', addMenuModel.value)
    //弹框关闭
    onClose();
  }
  //展示弹框
  const show = (data: any) => {
    console.log(data, "data")
    //设置弹框属性
    dialog.title = '修改'
    addMenuModel.value = {
      type: "修改",
      ...data
    }
    onShow();
    addMenuForm.value ?.clearValidate();

  }

  //暴露出去
  defineExpose({
    show
  })
</script>
<style scoped lang='scss'>
</style>