<script setup>
defineOptions({ name: 'PreviewData' })

defineProps({
  data: {
    type: Object,
    default: () => ({})
  }
})
</script>

<template>
  <el-scrollbar style="height: 100%; width: 100%">
    <div class="content">
      {{ data.content }}
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.content {
  padding-left: 6px;
  padding-right: 16px;
  line-height: 22px;
}
</style>
