<template>
<div class="box">
   <collapse-bar />
  <breadcrumb-bar />
  
</div>
<Avator></Avator>
 
</template>

<script setup lang="ts">
  import CollapseBar from './Collapse.vue'
  import BreadcrumbBar from './Breadcrumb.vue'
  import Avator from './Avator.vue'
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
}
</style>