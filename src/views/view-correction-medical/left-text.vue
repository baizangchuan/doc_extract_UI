<script setup>
import { ref, reactive } from 'vue'

import ArrowLeft from '@/components/svg/arrow-left.vue'
import ArrowRight from '@/components/svg/arrow-right.vue'

defineOptions({
  name: 'LeftText'
})

const page = reactive({
  current: 1,
  total: 5
})

const tabName = ref('sample')

const handleSwitchPage = (delta) => {
  if ((delta === 1 && page.current === page.total) || (delta === -1 && page.current === 1)) {
    return
  }
  page.current = page.current + delta
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

      <div class="right">
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
  </div>
</template>

<style scoped lang="scss">
.left-text {
  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
  }

  .header .right {
    display: flex;
    align-items: center;
    position: relative;
    top: 2px;
    user-select: none;
  }

  .header .right .icon {
    cursor: pointer;
  }

  .header .right .text {
    margin: 0 6px;
    position: relative;
    top: 1px;
  }
}
</style>
