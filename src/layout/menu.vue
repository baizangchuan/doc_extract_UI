<script setup>
import { ref } from 'vue'
import HomeSvg from '@/components/svg/home-svg.vue'
import ParseSvg from '@/components/svg/parse-svg.vue'
import { useRoute, useRouter } from 'vue-router'

const menuList = [
  {
    name: '首页',
    path: '/dashboard',
    icon: HomeSvg
  },
  {
    name: '解析管理',
    path: '/parse-management',
    icon: ParseSvg
  }
]

const router = useRouter()
const route = useRoute()

const active = ref(route.path)

const handleMenuClick = (item) => {
  if (active.value === item.path) {
    return
  }
  active.value = item.path
  router.push(item.path)
}
</script>

<template>
  <div class="menu-wrapper">
    <div class="menu">
      <template v-for="item in menuList" :key="item.path">
        <div
          class="menu-item"
          :class="{ active: active === item.path }"
          @click="handleMenuClick(item)"
        >
          <component :is="item.icon" :fillColor="active === item.path ? '#409EFF' : '#6C7995'" />
          <span class="name">{{ item.name }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-wrapper {
  height: 100%;
  user-select: none;
}

.menu {
  padding: 14px;
}

.menu-item {
  margin-bottom: 1px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  width: 158px;
  height: 44px;
  border-radius: 4px;
  cursor: pointer;

  .name {
    margin-left: 6px;
    position: relative;
    top: 1px;
  }
}

.menu-item.active {
  background: rgba(0, 134, 255, 0.1);
  color: #399bff;
}
</style>
