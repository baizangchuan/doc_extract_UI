<script setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

defineOptions({
  name: 'Breadcrumb'
})

const route = useRoute()
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>智能文本解析</el-breadcrumb-item>
    <el-breadcrumb-item v-if="route.meta.title">{{ route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
