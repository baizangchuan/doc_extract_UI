<script setup>
import { CaretBottom } from '@element-plus/icons-vue'

import AvatarSvg from '@/assets/svg/avatar.svg'

defineOptions({
  name: 'HeaderRight'
})
</script>

<template>
  <el-dropdown class="header-right">
    <span class="content">
      <img :src="AvatarSvg" alt="" />
      <span class="username">超级管理员</span>
      <el-icon color="#409eff">
        <CaretBottom />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  outline: none;

  .username {
    margin: 0 8px;
    position: relative;
    top: 1px;
  }
}
</style>
