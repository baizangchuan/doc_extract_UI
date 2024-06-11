<script setup>
import { ArrowRight } from '@element-plus/icons-vue'

defineOptions({
  name: 'Breadcrumb'
})
</script>

<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item>智能文本解析</el-breadcrumb-item>
    <el-breadcrumb-item>首页</el-breadcrumb-item>
  </el-breadcrumb>
</template>
