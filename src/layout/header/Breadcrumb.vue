<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in tabs" :key="item.name">{{
      item.meta.title
    }}</el-breadcrumb-item>
    <!-- :to="{ path: item.path }" -->
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch, Ref } from "vue";
import { useRoute, RouteLocationMatched } from "vue-router";

const route = useRoute();
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const getBreadcurm = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  // console.log(route, "matched");
  if (matched[0].path != "/dashboard") {
    matched = [{ path: "/dashboard", meta: { title: "首页" } } as any].concat(matched);
  }
  tabs.value = matched;
};
getBreadcurm();
watch(() => route.path,() => getBreadcurm());
</script>

<style scoped></style>
