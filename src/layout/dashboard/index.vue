<template>
  <el-main :style="{ height: mianHeight + 'px' }">
    <div style="display: flex;">
      <el-card style="flex: 1;">
        <template #header>
          <div class="card-header">
            <span>今天访客</span>
          </div>
        </template>
        <div ref="myChart" :style="{ width: '100%', height: '280px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span>订单统计</span>
          </div>
        </template>
        <div ref="myChart1" :style="{ width: '100%', height: '280px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px;flex: 1;">
        <template #header>
          <div class="card-header">
            <span style="color: rgb(255, 118, 112);">待发送</span>
          </div>
        </template>
        <div ref="myChart2" :style="{ width: '100%', height: '280px' }"></div>
      </el-card>

    </div>
    <el-card style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span style="color: blue;">项目详情</span>
        </div>
      </template>
      <div style="display: flex; justify-content: space-between; cursor: pointer;">
        <div style="flex: 1 1 0%;">
          <div>
            <el-link href="https://github.com/princesshuan/vite-vue3-project" target="_blank">1、Vue3 + Ts + Element Plus项目github地址</el-link>
          </div>
          <div style="margin-top: 20px;">
            <el-link href="#" target="_blank">2、Vue+vite+ts的后台管理系统</el-link>
          </div>
          <div style="margin-top: 20px;">
            <el-link href="https://vuex.vuejs.org/zh/guide/composition-api.html" target="_blank">3、此项目使用了vue-router和vuex技术</el-link>
          </div>
          <div style="margin-top: 20px;">
            <el-link href="https://element-plus.org/zh-CN/" target="_blank">4、此项目页面采用了Element-Plus+Echarts</el-link>
          </div>

        </div>
        <div ref="myChart3" :style="{ width: '100%', height: '290px',flex: '1 1 0%'}"></div>
      </div>

    </el-card>
  </el-main>
</template>
<script setup lang='ts'>
  import { ref, nextTick, onMounted, reactive } from 'vue'
  import { ComponentInternalInstance, getCurrentInstance } from 'vue'
  const { appContext, proxy } = getCurrentInstance() as ComponentInternalInstance
  const global = appContext.config.globalProperties

  const mianHeight = ref(0)
  const myChart = ref < HTMLElement > ();
  const myChart1 = ref < HTMLElement > ();
  const myChart2 = ref < HTMLElement > ();
  const myChart3 = ref < HTMLElement > ();

  //柱状图
  const charts1 = () => {
    const echartInstance = global.$echarts.init(myChart.value);
    let option = reactive({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }]
    });
    echartInstance.setOption(option)
  }
  //饼图
  const charts2 = () => {
    const myChart = global.$echarts.init(myChart2.value);
    let option = reactive({
      title: {
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    });
    myChart.setOption(option)
  }
  //环图
  const charts3 = () => {
    const myChart = global.$echarts.init(myChart1.value);
    let option = reactive({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }]
    });
    myChart.setOption(option)
  }
  //环图
  const charts4 = () => {
    const myChart = global.$echarts.init(myChart3.value);
    let option = reactive({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [{
        name: 'vue3',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Vue3' },
          { value: 735, name: 'typescript' },
          { value: 580, name: 'Element-Puls' },
          { value: 484, name: 'vuex' },
          { value: 300, name: 'echarts' }
        ]
      }]
    });
    myChart.setOption(option)
  }

  onMounted(() => {
    charts1();
    charts2();
    charts3();
    charts4();
    nextTick(() => {
      mianHeight.value = window.innerHeight - 100
    })
  })
</script>
<style scoped lang='scss'>
.el-link{
    font-size: 17px;
    font-weight: bold;
    color: black;
    text-decoration: underline;
}
.card-header {
    font-weight: bold;
}
</style>