<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

import { deleteTemplateApi } from '@/services'
import { decimalToPercentage } from '@/utils/format'

defineProps({
  diagnosis: {
    type: Object,
    default: () => ({})
  },
  currentIndex: {
    type: Number,
    default: -1
  },
  cardIndex: {
    type: Number,
    default: -2
  }
})

const emit = defineEmits('update-card')

const handleDelete = (item) => {
  ElMessageBox.confirm('删除之后历史数据不可追溯？', '您确定要删除吗？', {
    type: 'warning'
  })
    .then(async () => {
      await deleteTemplateApi(item.templateConfigId)
      ElMessage.success('删除成功')
      emit('update-card')
    })
    .catch(() => {})
}
</script>

<template>
  <div class="diagnosis-card" :class="{ active: currentIndex === cardIndex }">
    <div class="header">
      <span class="group">{{ diagnosis.similarGroup }}</span>
      <span class="text">相似度</span>
      <span class="percent">{{ decimalToPercentage(diagnosis.similarity) }}</span>
    </div>

    <div class="list">
      <div class="item" v-for="item in diagnosis.templateConfigs" :key="item.templateConfigId">
        <span class="name">{{ item.templateConfigName }}</span>
        <span class="sample-num">样本量：{{ item.matchSampleNum }}</span>
        <span class="btn">
          <el-button @click.stop="handleDelete(item)" type="primary" link size="small"
            >删除</el-button
          >
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.diagnosis-card {
  padding: 14px 10px;
  border: 1px solid #d1d5d9;
  border-radius: 6px;
  margin-right: 14px;
  cursor: pointer;

  &.active {
    border-color: #409eff;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.1),
      0 6px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.5s ease; /* 阴影过渡效果 */
  }

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 12px;

    .group {
      font-size: 17px;
    }

    .text {
      font-size: 13px;
    }

    .percent {
      color: red;
      font-size: 17px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .item {
      display: flex;
      align-items: center;
      font-size: 13px;
      .name {
        width: 58%;
      }

      .sample-num {
        width: 32%;
      }

      .btn {
        width: 10%;
      }
    }
  }
}
</style>
