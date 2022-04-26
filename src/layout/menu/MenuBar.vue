<template>
  <menu-logo></menu-logo>

  <el-menu
    router
    :default-active="activeIndex"
    unique-opened
    background-color="#304l56"
    text-color="#fff"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
  >
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import MenuItem from "./MenuItem.vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { getMenuList } from "@/http/api";
const store = useStore();
//setup 语法糖中 定义的数据和方法可以直接在模板中使用 无需return
const route = useRoute();
//获取当前激活菜单
const activeIndex = computed(() => {
  const { path } = route;
  return path;
});
//菜单数据动态获取
let menuList: any = ref([]);
onMounted(async () => {
  let routerData: any = await getMenuList();
  menuList.value = [
    {
      path: "/dashboard",
      component: "Layout",
      meta: {
        title: "首页",
        icon: "HomeFilled",
        roles: ["sys:manage"],
      },
      children: [],
    },
  ].concat(routerData.data);
  // console.log(menuList.value);
});

let isCollapse = computed(() => {
  return store.getters["getCollapse"];
});
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
