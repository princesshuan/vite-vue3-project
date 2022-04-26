<template>
  <el-dialog
    top="5vh"
    :title="title"
    :model-value="visible"
    :width="width + 'px'"
    :before-close="onClose"
    append-to-body
  >
    <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { watch } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: "标题",
  },
  visible: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 600,
  },
  height: {
    type: Number,
    default: 250,
  }
})
watch(() => props.visible, () => {
  console.log('组件监听到')
  console.log(props)
})
const emit = defineEmits(['onClose', 'onConfirm'])
//弹框取消事件
const onClose = () => {
  emit('onClose')
}
//弹框确定事件
const onConfirm = () => {
  emit('onConfirm')
}
</script>

<style lang="scss" scope>
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  border-top-left-radius: 7px !important;
  border-top-right-radius: 7px !important;
  .el-dialog__header {
    border-top-left-radius: 7px !important;
    border-top-right-radius: 7px !important;
    background-color: #1890ff !important;

    margin-right:0px;

    .el-dialog__title {
      color: #fff;
      font-size: 16px;
      font-weight: 600;
    }
    
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  
  }
  .el-dialog__body {
    padding: 25px;
    .el-form--inline .el-form-item{
      margin-right: 10px;
    }
    .el-input {
      width: 200px;
    }
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>