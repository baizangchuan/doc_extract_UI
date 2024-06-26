<script setup>
import Breadcrumb from './breadcrumb.vue'

import HeaderRight from './header-right.vue'
import Menu from './menu.vue'

import LogoSvg from '@/assets/svg/logo.svg'
import TextLogoSvg from '@/assets/svg/text_logo.svg'

defineOptions({
  name: 'Layout'
})
</script>

<template>
  <el-container class="layout">
    <el-aside class="menu" width="186px">
      <div class="title">
        <img :src="LogoSvg" height="20" alt="" />
        <img class="text-logo" :src="TextLogoSvg" width="120" alt="" />
      </div>
      <div class="content">
        <Menu />
      </div>
    </el-aside>
    <el-container class="main">
      <el-header class="header">
        <div></div>
        <div class="right">
          <HeaderRight />
        </div>
      </el-header>
      <el-main class="content">
        <!-- 面包屑 -->
        <div class="breadcrumb">
          <Breadcrumb />
        </div>

        <div class="main-content">
          <RouterView v-slot="{ Component }">
            <KeepAlive include="ParseManagement">
              <component :is="Component" :key="$route.fullPath" />
            </KeepAlive>
          </RouterView>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout {
  height: 100%;
}

.menu {
  background: linear-gradient(to bottom, #eff5fa, #edf4fa, #eff5fa, #f2f6fa, #f4f8f9, #f5f8f9);
  height: 100%;

  .title {
    width: 100%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e1e6ee;
  }

  .title .text-logo {
    margin-left: 6px;
    position: relative;
    top: 1px;
  }

  .content {
    height: calc(100% - 65px);
  }
}

.main {
  .header {
    background: linear-gradient(to right, #eff5fa, #edf4fa, #eff5fa, #f2f6fa, #f4f8f9, #f5f8f9);
    border-bottom: 1px solid #e1e6ee;
    height: 65px;
    line-height: 65px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
  }

  .header .right {
    padding-right: 30px;
    display: flex;
    align-items: center;
  }

  .content {
    background: linear-gradient(to bottom, #eff5fa, #edf4fa, #eff5fa, #f2f6fa, #f4f8f9, #f5f8f9);

    .breadcrumb {
      height: 20px;
    }

    .main-content {
      margin-top: 20px;
      height: calc(100% - 40px);
      /* background-color: salmon; */
    }
  }
}
</style>
