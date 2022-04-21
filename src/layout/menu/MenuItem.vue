<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length>0" :index="menu.path">
      <template #title>
        <el-icon>
          <component :is="menu.meta.icon" />
        </el-icon>
        <span>{{menu.meta.title}}</span>
      </template>
      <menu-item :menuList="menu.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
      <el-icon>
        <component :is="menu.meta.icon" />
      </el-icon>
      <template #title>{{menu.meta.title}}</template>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
  import MenuItem from './MenuItem.vue'
  defineProps(['menuList'])
</script>

<style scoped>

</style>