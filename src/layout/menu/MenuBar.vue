<template>
  <menu-logo></menu-logo>

  <el-menu router :default-active="activeIndex" unique-opened background-color="#304l56" text-color="#fff" class="el-menu-vertical-demo" :collapse="isCollapse">
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script setup lang="ts">
  import { ref, reactive, computed } from "vue"
  import MenuItem from './MenuItem.vue'
  import MenuLogo from './MenuLogo.vue'
  import { useRoute } from 'vue-router'
  import { useStore } from '@/store'
  const store = useStore()
  //setup 语法糖中 定义的数据和方法可以直接在模板中使用 无需return
  const route = useRoute()
  //获取当前激活菜单
  const activeIndex = computed(() => {
    const { path } = route
    return path
  })
  //菜单数据
  let menuList = reactive([{
      path: '/dashboard',
      component: 'Layout',
      meta: {
        title: '首页',
        icon: 'HomeFilled',
        roles: ['sys:manage']
      },
      children: []
    },
    {
      path: '/system',
      component: 'Layout',
      name: 'system',
      meta: {
        title: '系统管理',
        icon: 'menu',
        roles: ['sys:manage'],
        parentId: 0
      },
      children: [{
          path: '/department',
          component: '/system/department/department',
          alawyShow: false,
          name: 'department',
          meta: {
            title: '机构管理',
            icon: 'Platform',
            roles: ['sys:dept'],
            parentId: 17
          }
        },
        {
          path: '/userList',
          component: '/system/userList/userList',
          alawyShow: false,
          name: 'userList',
          meta: {
            title: '用户管理',
            icon: 'Avatar',
            roles: ['sys:user'],
            parentId: 17
          }
        },
        {
          path: '/roleList',
          component: '/system/roleList/roleList',
          alawyShow: false,
          name: 'roleList',
          meta: {
            title: '角色管理',
            icon: 'Tools',
            roles: ['sys:role'],
            parentId: 17
          }
        },
        {
          path: '/authorityList',
          component: '/system/authorityList/authorityList',
          alawyShow: false,
          name: 'authorityList',
          meta: {
            title: '权限管理',
            icon: 'document',
            roles: ['sys:authority'],
            parentId: 17
          }
        }
      ]
    },
    {
      path: '/goods',
      component: 'Layout',
      name: 'goods',
      meta: {
        title: '商品管理',
        icon: 'document',
        roles: ['sys:goods'],
        parentId: 0
      },
      children: [{
          path: '/order',
          component: '/goods/order/order',
          alawyShow: false,
          name: 'order',
          meta: {
            title: '订单管理',
            icon: 'Briefcase',
            roles: ['sys:order'],
            parentId: 17
          }
        },
        {
          path: '/classfiy',
          component: '/goods/classfiy/classfiy',
          alawyShow: false,
          name: 'classfiy',
          meta: {
            title: '分类管理',
            icon: 'Briefcase',
            roles: ['sys:classfiy'],
            parentId: 17
          }
        }
      ]
    },
    {
      path: '/sysconfig',
      component: 'Layout',
      name: 'sysconfig',
      meta: {
        title: '系统工具',
        icon: 'document',
        roles: ['sys:document'],
        parentId: 0
      },
      children: [{
          path: '/document',
          component: '/sysconfig/document/document',
          alawyShow: false,
          name: 'document',
          meta: {
            title: '接口文档',
            icon: 'document',
            roles: ['sys:document'],
            parentId: 17
          }
        },
        {
          path: '/logList',
          component: '/system/logList/logList',
          alawyShow: false,
          name: 'logList',
          meta: {
            title: '日志管理',
            icon: 'document',
            roles: ['sys:sysconfig'],
            parentId: 17
          }
        }
      ]
    }
  ])
  let isCollapse = computed(() => {
    return store.getters['getCollapse']
  })
</script>
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }


  .el-menu {
    border-right: none;
  }

  :deep(.el-sub-menu.el-sub-menu_title) {
    color: #f4f4f5 !important;
  }

  /*.el-submenu.is-active.el-submenu__title {
        border-bottom-color: #l890ff;
      }

      */
  :deep(.el-menu.el-menu-item) {
    color: #bfcbd9;
  }

  /*菜单点中文字的颜色*/
  :deep(.el-menu-item.is-active) {
    color: #ffd04b !important;
  }

  /*当前打开菜单的所有子菜单颜色*/
  :deep(.el-sub-menu.is-opened .el-menu.el-menu--inline) {
    background-color: #1f2d3d !important;
  }

  /*鼠标移动菜单的颜色*/
  :deep(.el-menu-item:hover) {
    background-color: #001528 !important;
  }
</style>