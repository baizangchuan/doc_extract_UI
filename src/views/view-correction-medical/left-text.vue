<script setup>
import { ref, reactive, watch } from 'vue'

import ArrowLeft from '@/components/svg/arrow-left.vue'
import ArrowRight from '@/components/svg/arrow-right.vue'

import { parseSampleApi } from '@/services'

defineOptions({
  name: 'LeftText'
})

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
  matchSampleIdList: {
    type: Array,
    default: () => []
  }
})

watch(
  () => props.matchSampleIdList,
  (data) => {
    page.current = 1
    page.total = data.length
    if (data.length) {
      loadParseSample()
    }
  }
)

const page = reactive({
  current: 1,
  total: 5
})

const tabName = ref('sample')
const sampleInfo = ref({})

const loadParseSample = async () => {
  const { info, matchSampleIdList } = props
  const result = await parseSampleApi(info.templateConfigId, matchSampleIdList[page.current - 1])
  sampleInfo.value = result.data
}

const handleSwitchPage = (delta) => {
  if ((delta === 1 && page.current === page.total) || (delta === -1 && page.current === 1)) {
    return
  }
  page.current = page.current + delta
  loadParseSample()
}
</script>

<template>
  <div class="left-text">
    <div class="header">
      <div class="left">
        <el-button-group>
          <el-button :type="tabName === 'sample' ? 'primary' : ''" @click="tabName = 'sample'">
            样本病历文本
          </el-button>
          <el-button :type="tabName === 'plain' ? 'primary' : ''" @click="tabName = 'plain'">
            原格式文本
          </el-button>
        </el-button-group>
      </div>

      <div class="right" v-if="page.total">
        <ArrowLeft
          @click="handleSwitchPage(-1)"
          class="icon"
          :fill-color="page.current === 1 ? '#606266' : '#409eff'"
        />
        <span class="text">
          <span>{{ page.current }}</span>
          <span> / </span>
          <span>{{ page.total }}</span>
        </span>
        <ArrowRight
          @click="handleSwitchPage(1)"
          class="icon"
          :fill-color="page.current === page.total ? '#606266' : '#409eff'"
        />
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <el-scrollbar class="scroll">
        <div v-if="tabName === 'sample'" v-html="sampleInfo.content"></div>
        <div v-if="tabName === 'plain'">{{ sampleInfo.originContent }}</div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style scoped lang="scss">
.left-text {
  height: 100%;
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;

    .right {
      display: flex;
      align-items: center;
      position: relative;
      top: 2px;
      user-select: none;
    }

    .right .icon {
      cursor: pointer;
    }

    .right .text {
      margin: 0 6px;
      position: relative;
      top: 1px;
    }
  }

  .content {
    padding: 0 0 0 12px;
    height: calc(100% - 60px);
    line-height: 24px;

    .scroll {
      padding-right: 12px;
    }
  }
}
</style>
