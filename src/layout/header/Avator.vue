<template>
  <div class="user-box">
    <div style="margin-right: 20px;">欢迎你，{{userName}}</div>
    <el-dropdown :hide-on-click="false" @command="handleCommand">
      <el-avatar size="" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="userDetail">用户信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>

</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage, ElMessageBox } from 'element-plus'
  const router = useRouter()
  const userName = sessionStorage.getItem('userName') || ref('test')
  const handleCommand = (command: string) => {
    if (command === 'logout') {
      ElMessageBox.confirm(
          '确定退出登录吗?', '系统提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          sessionStorage.removeItem('userName')
          sessionStorage.removeItem('token')
          router.push({ path: '/login' })
        }).catch(() => {
          
        })

    }
  }
</script>

<style scoped>
  .user-box {
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    /* width: 118px; */
  }
</style>