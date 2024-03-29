<template>
  <sys-dialog :title="parentDialog.title" :width="parentDialog.width" :height="parentDialog.height" :visible="parentDialog.visible" @onClose="parentOnClose" @onConfirm="parentOnConfirm">
    <template v-slot:content>
      <el-tree style="font-size: 14px" ref="parentTree" :data="treeData.data" node-key="id" :props="defaultProps" default-expand-all :highlight-current="true" :expand-on-click-node="false" @node-click="handleNodeClick">
        <template #default="{ node, data }">
          <div class="custom-tree-container">
            <!-- 长度为0说明没有下级 -->
            <span v-if="data.children.length == 0">
              <DocumentRemove style="width: 1.3em; height: 1.3em; margin-right: 5px;color: #8c8c8c;"></DocumentRemove>
            </span>
            <span v-else @click.stop="openBtn(data)">
              <component style="width: 1.1em; height: 1.1em; margin-right: 5px;color: #8c8c8c;" :is="data.open ? Plus : Minus" />
            </span>
            <span>{{ node.label }}</span>
          </div>
        </template>
      </el-tree>
    </template>
  </sys-dialog>
</template>
<script setup lang='ts'>
  import SysDialog from '@/components/SysDialog.vue'
  import { ref, reactive } from 'vue'
  import { getMenuParent } from '@/http/api'
  import { ElTree } from 'element-plus'
  import { DocumentRemove, Plus, Minus } from '@element-plus/icons'
  import { DialogModel } from '../department/type/department'
  const parentDialog = reactive < DialogModel > ({
    title: '',
    visible: false,
    width: 300,
    height: 400
  })

  //关闭弹框
  const parentOnClose = () => {
    parentDialog.visible = false;
  }
  //确定弹框
  const parentOnConfirm = () => {
    emits('select', selectNode)
    parentDialog.visible = false;
  }
  //显示弹框
  const treeData = reactive({
    data: []
  })
  //树属性绑定
  const defaultProps = reactive({
    children: "children",
    label: "label",
    disabled: 'false'
  })
  const onShow = async () => {
    console.log('来了')
    //获取部门树数据
    const res: any = await getMenuParent()
    console.log(res)
    if (res && res.code == 200) {
      console.log(res.data)
      treeData.data = res.data;
      parentDialog.visible = true;
    }
  }

  //返回选中的数据
  const selectNode = reactive({
    parentId: '',
    parentName: ''
  })
  //树节点点击事件
  const handleNodeClick = (node: { id: string;label: string }) => {
    console.log(node)
    selectNode.parentId = node.id
    selectNode.parentName = node.label;
  }
  const parentTree = ref < InstanceType < typeof ElTree >> ()
  const openBtn = (data: any) => {
    data.open = !data.open;
    parentTree.value.store.nodesMap[data.id].expanded = !data.open;
  }

  //父组件调用子组件展示弹框
  const showParent = () => {
    //显示弹框
    onShow();
    //设置弹框的标题
    parentDialog.title = '选择上级菜单'

  }
  //暴露给外部调用
  defineExpose({
    showParent
  })
  const emits = defineEmits(['select'])
</script>

<style lang="scss">
  .el-tree {

    // 将每一行的设置为相对定位 方便后面before after 使用绝对定位来固定位置
    .el-tree-node {
      position: relative;
      padding-left: 10px;
    }

    // 子集像右偏移 给数线留出距离
    .el-tree-node__children {
      padding-left: 20px;
    }

    //这是竖线
    .el-tree-node :last-child:before {
      height: 40px;
    }

    .el-tree>.el-tree-node:before {
      border-left: none;
    }

    .el-tree>.el-tree-node:after {
      border-top: none;
    }

    //这自定义的线 的公共部分
    .el-tree-node:before,
    .el-tree-node:after {
      content: "";
      left: -4px;
      position: absolute;
      right: auto;
      border-width: 1px;
    }

    .tree :first-child .el-tree-node:before {
      border-left: none;
    }

    // 竖线
    .el-tree-node:before {
      border-left: 1px dotted #d9d9d9;
      bottom: 0px;
      height: 100%;
      top: -25px;
      width: 1px;
    }

    //横线
    .el-tree-node:after {
      border-top: 1px dotted #d9d9d9;
      height: 20px;
      top: 14px;
      width: 24px;
    }

    .el-tree-node__expand-icon.is-leaf {
      width: 8px;
    }

    //去掉elementui自带的展开按钮  一个向下的按钮,打开时向右
    .el-tree-node__content>.el-tree-node__expand-icon {
      display: none;
    }

    //每一行的高度
    .el-tree-node__content {
      line-height: 30px;
      height: 30px;
      padding-left: 10px !important;
    }
  }

  //去掉最上级的before  after 即是去电最上层的连接线
  .el-tree>div {
    &::before {
      display: none;
    }

    &::after {
      display: none;
    }
  }
</style>