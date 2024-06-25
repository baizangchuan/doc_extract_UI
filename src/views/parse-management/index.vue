<script setup>
import { ref } from 'vue'

import TaskManagement from './c-pages/task.vue'
import TemplateManagement from './c-pages/template.vue'

defineOptions({
  name: 'ParseManagement'
})

const tabList = [
  {
    name: '任务管理',
    value: 'task'
  },
  {
    name: '模板管理',
    value: 'template'
  }
]

const tabName = ref('task')

const handleTabClick = (item) => {
  tabName.value = item.value
}
</script>

<template>
  <div class="parse-management">
    <div class="tab-list">
      <template v-for="item in tabList" :key="item.value">
        <div class="item" :class="{ active: tabName === item.value }" @click="handleTabClick(item)">
          {{ item.name }}
        </div>
      </template>
    </div>

    <div class="content">
      <TaskManagement v-if="tabName === 'task'" />
      <TemplateManagement v-else-if="tabName === 'template'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.parse-management {
  height: 100%;
  background-color: white;
  border-radius: 4px;

  .tab-list {
    padding: 8px 20px;
    display: flex;
    gap: 28px;

    .item {
      line-height: 32px;
      cursor: pointer;
      user-select: none;
    }

    .item.active {
      border-bottom: 3px solid #409eff;
      color: #409eff;
    }
  }

  .content {
    height: calc(100% - 58px);
  }
}
</style>
