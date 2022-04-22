<template>
  <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-remove="removeTab" @tab-click="tabClick">
    <el-tab-pane v-for="item in TabsList" :key="item.path" :label="item.title" :name="item.path">
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
  import { ref, computed, watch, onMounted } from 'vue'
  import { useStore } from '@/store'
  import { useRoute, useRouter } from 'vue-router'
  import { TabInt } from './type'
  const store = useStore()
  const route = useRoute()
  const router = useRouter()
  //获取当前激活菜单
  const activeTab = ref('')
  const setActiveTab = () => {
    activeTab.value = route.path
  }

  //监听路由
  watch(() => route.path, () => {
    //新增tab
    addTab()
    setActiveTab()
  })
  //获取tabs
  const TabsList = computed(() => {
    return store.getters['getTabs']
  })

  const addTab = () => {
    const { path, meta } = route
    const tab: TabInt = {
      path: path,
      title: meta.title
    }
    store.commit('addTab', tab)
  }
  const tabClick = (tab: any) => {
    // console.log(tab.paneName)
    router.push({
      path: tab.paneName
    })
  }
  const removeTab = (path: string) => {
    if (path === '/dashboard') return
    const tabs = TabsList.value
    let activeName = activeTab.value
    if (activeName === path) {
      tabs.forEach((tab: TabInt, index: number) => {
        if (tab.path === path) {
          const nextTab = tabs[index + 1] || tabs[index - 1]
          if (nextTab) {
            activeName = nextTab.path
          }
        }
      })
    }
    //重新设置激活选项卡并跳转路由
    activeTab.value = activeName
    router.push({
      path: activeName
    })
    //更新TabsList
    // store.state.tabsList = tabs.filter((tab) => tab.path !== path)
    store.commit('removeTab', path)
  }

  //解决刷新数据丢失问题
  const beforRefresh= ()=>{
      window.addEventListener('beforeunload',()=>{
          sessionStorage.setItem('tabsView',JSON.stringify(TabsList.value))
      })
      let tabSession = sessionStorage.getItem('tabsView')
      if(tabSession) {
          let oldTabs = JSON.parse(tabSession)
          if(oldTabs.length >0) {
              store.state.tabsList = oldTabs
          }
      }
  }
  onMounted(() => {
    addTab()
    setActiveTab()
    beforRefresh()
  })
</script>

<style scoped lang=scss>
  :deep(.el-tabs__header) {
    margin: 0px;
  }

  :deep(.el-tabs__item) {
    height: 26px !important;
    line-height: 26px !important;
    text-align: center !important;
    border: 1px solid #d8dce5 !important;
    margin: 0px 3px !important;
    color: #495060;
    font-size: 12px !important;
    padding: 0px 10px !important;
  }

  :deep(.el-tabs__nav) {
    border: none !important;
  }

  :deep(.is-active) {
    border-bottom: 1px solid transparent !important;
    border: 1px solid #42b983 !important;
    background-color: #42b983 !important;
    color: #fff !important;
  }

  :deep(.el-tabs__item:hover) {
    color: #495060 !important;
  }

  :deep(.is-active:hover) {
    color: #fff !important;
  }
</style>