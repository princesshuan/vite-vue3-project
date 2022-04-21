<script setup lang="ts">
import { ref,computed } from 'vue'
import { useStore } from '@/store'
// import { key } from './store'
const store = useStore()
const count = ref(0)
const showcount = computed(()=>{
  return store.getters['getCount']
})
const addBtn = () =>{
  store.commit('setCount',++count.value)
}
</script>

<template>
  <h1>{{ showcount }}</h1>
   <h1>{{ count }}</h1>
   
  <button type="button" @click="addBtn">新增</button>

</template>

<style scoped>

</style>
