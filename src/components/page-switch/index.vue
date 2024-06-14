<script setup>
import { reactive, watch } from 'vue'

import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'

const emit = defineEmits(['page-change'])

const props = defineProps({
  total: {
    type: Number,
    default: 1
  }
})

const page = reactive({
  current: 1,
  total: 1
})

watch(
  () => props.total,
  (val) => {
    page.total = val
  }
)

const handlePageClick = (num) => {
  const current = page.current + num
  if (current < 1 || current > page.total) {
    return
  }
  page.current = current
  emit('page-change', current)
}
</script>

<template>
  <div class="page-switch">
    <div class="left" :class="{ inactive: page.current === 1 }" @click="handlePageClick(-1)">
      <slot name="left">
        <el-icon class="icon"><ArrowLeft /></el-icon>
        <span>上一份</span>
      </slot>
    </div>
    <div class="content">
      <slot name="content">
        <span class="left-text">
          {{ page.current }}
        </span>
        <span> / </span>
        <span>{{ page.total }}</span>
      </slot>
    </div>
    <div
      class="right"
      :class="{ inactive: page.total === page.current }"
      @click="handlePageClick(1)"
    >
      <slot name="right">
        <span>下一份</span>
        <el-icon class="icon"><ArrowRight /></el-icon>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-switch {
  display: flex;
  align-items: center;
  font-size: 13px;

  .left.inactive,
  .right.inactive {
    color: #c8c8c8;
  }

  .left,
  .right {
    font-size: 12px;
    line-height: 13px;
    cursor: pointer;
    user-select: none;
    .icon {
      position: relative;
      top: 1px;
    }
  }

  .content {
    padding: 0 24px;

    .left-text {
      color: #409eff;
    }
  }
}
</style>
