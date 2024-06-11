<script setup>
import { ref } from 'vue'
import ViewCorrectionMedical from './view-correction-medical/index.vue'

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

const active = ref('task')
const viewType = ref('1')

const handleTabClick = (item) => {
  active.value = item.value
}
</script>

<template>
  <div class="parse-management" v-show="viewType === '0'">
    <div class="tab-list">
      <template v-for="item in tabList" :key="item.value">
        <div class="item" :class="{ active: active === item.value }" @click="handleTabClick(item)">
          {{ item.name }}
        </div>
      </template>
    </div>

    <!-- 按钮 -->
    <div class="btn-wrapper">
      <el-button type="primary">创建解析任务</el-button>
    </div>
  </div>

  <ViewCorrectionMedical v-if="viewType !== '0'" :viewType="viewType" />
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

  .btn-wrapper {
    padding: 6px 20px;
  }
}
</style>
