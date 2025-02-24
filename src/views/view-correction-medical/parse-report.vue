<script setup>
import { ref } from 'vue'

const visible = ref(false)

const sampleNum = ref(0)
const configNodeList = ref([])

const open = (matchSampleNum, configNodes) => {
  visible.value = true
  sampleNum.value = matchSampleNum
  configNodeList.value = configNodes
}

// 比例
const matchRadio = (matchSampleNum) => {
  const ratio = (matchSampleNum / sampleNum.value) * 100
  return ratio.toFixed(2) + '%'
}

defineExpose({ open })
</script>

<template>
  <el-drawer v-model="visible" :size="760">
    <template #header>
      <h4 class="title">解析报告</h4>
    </template>

    <template #default>
      <!-- 头部统计信息 -->
      <div class="header">
        <div class="top">
          <div class="left">
            <span>总key数</span>
            <span class="count">{{ configNodeList.length }}</span>
          </div>
          <div class="right">
            <span>总文书数</span>
            <span class="count">{{ sampleNum }}</span>
          </div>
        </div>
        <div class="divide-line"></div>
        <div class="bottom">明细表</div>
      </div>

      <!-- 表格 -->
      <div class="content">
        <el-table
          :data="configNodeList"
          class="custom-table"
          style="width: 100%; height: 100%"
          border
        >
          <el-table-column prop="configNodeKey" label="名称">
            <template #default="{ row }">
              <span>{{ row.configNodeKey }}</span>
            </template>
          </el-table-column>
          <el-table-column label="识别数/总文书数">
            <template #default="{ row }">
              <span>{{ row.matchSampleNum || 0 }}/{{ sampleNum }}</span>
            </template>
          </el-table-column>
          <el-table-column label="比例">
            <template #default="{ row }">
              <span>{{ matchRadio(row.matchSampleNum || 0) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否唯一" />
        </el-table>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.title {
  color: #333;
}

.header {
  font-size: 13px;
  .top {
    display: flex;

    .left,
    .right {
      flex: 1;
    }

    .count {
      margin-left: 10px;
    }
  }

  .divide-line {
    background-color: #e7e7e7;
    height: 1px;
    margin: 18px 0;
  }
}

.content {
  margin-top: 12px;
  height: calc(100% - 80px);

  :deep(.custom-table.el-table) {
    font-size: 12px;
  }

  :deep(.custom-table.el-table th.el-table__cell) {
    background-color: #eff5fa;
  }
}
</style>
