<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs" :key="item.name" :to="{ path: item.path }">{{item.meta.title}}</el-breadcrumb-item>

  </el-breadcrumb>

</template>

<script setup lang="ts">
  import { ref, reactive, computed } from "vue"
  import { useRoute, RouteLocationMatched } from 'vue-router'
  import { useStore } from '@/store'
  const store = useStore()
  //setup 语法糖中 定义的数据和方法可以直接在模板中使用 无需return
  const route = useRoute()
  const tabs: Ref < RouteLocationMatched[] > = ref([])
  const getBreadcurm = () => {
    let matched = route.matched.filter(item => item.meta && item.meta.title)
    console.log(matched)
    if()
    tabs.value = matched
  }
  getBreadcurm()
</script>

<style scoped>

</style>