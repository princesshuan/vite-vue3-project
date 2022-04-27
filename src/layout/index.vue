<template>
  <el-container class="layout">
    <el-aside width="auto" class="aside">
      <menu-bar></menu-bar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <tabs-bar></tabs-bar>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
  //在setup语法糖中，引入的组件可以直接使用，无需通过components进行注册
  import Header from './header/Header.vue';
  import MenuBar from './menu/MenuBar.vue';
  import TabsBar from './main/Tabs.vue';
</script>

<style lang="scss" scoped>
  .layout {
    height: 100%;

    .aside {
      background-color: rgb(48, 65, 86);

      .el-menu {
        // height: calc(100vh);
      }
    }

    .header {
      // background-color: aqua;
      height: 50px;
      border-bottom: 1px solid #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .main {
      // background-color: darkgray;
      padding-top: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }

  }
</style>