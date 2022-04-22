<template>
  <el-icon class="tools" @click="changeMenu()" :size="20">
    <component :is="isCollapse?Expand:Fold" />
  </el-icon>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import {
    Fold,
    Expand
  } from '@element-plus/icons-vue'
  import { useStore } from '@/store'
  const store = useStore()
  let isCollapse = computed(() => {
    return store.getters['getCollapse']
  })
  const changeMenu = () => {
    store.commit('setCollapse', !isCollapse.value)
  }
</script>

<style scoped>
.tools{
    display:flex;
    cursor:pointer;
    align-items:center;
    /* line-height:50px;
    height: 50px; */
    /* display:inline-block; */
    margin-right:15px;
}
</style>