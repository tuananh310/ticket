<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores'

import { Menu as IconMenu } from '@element-plus/icons-vue'

import router from '../router'

const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

</script>

<template>
  <div class="app-container bg-light">
    <div class="common-layout">
      <el-container class="main-container">
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" style="height: 100%">
            <el-menu-item index="2">
              <el-icon><icon-menu /></el-icon>
              <span>Tra cứu vé</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container>
          <el-header style="border-bottom: 1px solid var(--el-border-color)">
            <div style="display: flex; justify-content: end; margin-top: 1.5rem">
              <span v-if="authUser" style="margin-right: 1rem">{{ authUser?.name }}</span>
              <a
                v-if="authUser"
                @click="authStore.logout()"
                class="nav-item nav-link"
                style="margin-right: 2rem"
                >Đăng xuất</a
              >
              <a
                v-if="!authUser"
                @click="() => router.push('/login')"
                class="nav-item nav-link"
                style="margin-right: 2rem"
                >Đăng nhập</a
              >
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<style scoped>
.main-container {
  height: 100vh;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
</style>
