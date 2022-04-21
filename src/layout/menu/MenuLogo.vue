<template>
  <div class="logo">
    <img src="@/assets/logo.png" />
    <span v-if="!isCollapse" class="title">后台管理系统</span>
  </div>
</template>

<script setup lang="ts">
  import { computed } from "vue"
  import { useStore } from '@/store'
  const store = useStore()
   let isCollapse = computed(() => {
   return store.getters['getCollapse']
   })
</script>

<style lang="scss" scoped>
  .logo {
    background-color: #2b2f3a;
    height: 50px;
    line-height: 50px;
    display: flex;
    align-items: center;
    color: #fff;

    img {
      width: 32px;
      height: 32px;
      margin-right: 12px;
      margin-left: 15px;
    }

    .title {
      font-weight: 600;
      line-height: 50px;
      font-size: 16px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }
</style>