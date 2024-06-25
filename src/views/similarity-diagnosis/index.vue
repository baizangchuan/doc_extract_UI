<script setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Back } from '@element-plus/icons-vue'

import DiagnosisCard from './diagnosis-card.vue'
import ConfigList from './config-list.vue'

import { compareTemplateApi } from '@/services'

defineOptions({
  name: 'SimilarityDiagnosis'
})

const router = useRouter()

const route = useRoute()
const params = route.params

const similarityList = ref([])

// 卡片被选择索引项
const cureentIndex = ref(-1)

// 右侧查看列表数据
const templateConfigList = computed(() => {
  const length = similarityList.value.length
  if (cureentIndex.value < 0 || cureentIndex.value >= length) {
    return []
  }
  return similarityList.value[cureentIndex.value].templateConfigs
})

const handleBack = () => {
  router.back()
}

const loadData = async () => {
  const result = await compareTemplateApi(params.orgName)
  similarityList.value = result.data || []
  if (similarityList.value.length) {
    handleSwitchCard(0)
  }
}
loadData()

const handleSwitchCard = (index) => {
  cureentIndex.value = index
}
</script>

<template>
  <div class="similarity">
    <!-- 返回按钮 -->
    <div class="back">
      <el-icon @click="handleBack" size="32" class="arrow"><Back /></el-icon>
      <span class="text">相似度诊断</span>
    </div>

    <!-- 主体内容 -->
    <div class="main-content">
      <el-scrollbar style="height: 100%" v-if="similarityList.length">
        <div class="left">
          <template v-for="(item, index) in similarityList" :key="item.similarGroup">
            <DiagnosisCard
              :diagnosis="item"
              :current-index="cureentIndex"
              :card-index="index"
              @click="handleSwitchCard(index)"
              @update-card="loadData"
            />
          </template>
        </div>
      </el-scrollbar>
      <template v-else>
        <div class="left">
          <el-empty style="height: 90%; width: 100%" />
        </div>
      </template>

      <div class="right">
        <ConfigList :templateConfigList="templateConfigList" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.similarity {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.back {
  display: flex;
  align-items: center;

  .arrow {
    margin-right: 16px;
    cursor: pointer;
  }

  .text {
    font-size: 22px;
  }
}

.main-content {
  flex: 1;
  overflow: hidden;
  background-color: white;
  border-radius: 4px;
  display: flex;
  padding: 10px;
  gap: 10px;

  .left {
    height: 100%;
    width: 380px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    border-right: 1px solid #e7e7e7;
  }

  .right {
    width: calc(100% - 410px);
  }
}
</style>
