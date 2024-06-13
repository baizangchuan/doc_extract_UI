<script setup>
import { reactive } from 'vue'

defineOptions({
  name: 'LeftForm'
})

const taskForm = reactive({
  name: '',
  description: '',
  orgName: '',
  sampleSource: ''
})
</script>

<template>
  <el-form :model="taskForm" label-width="auto" style="max-width: 600px">
    <el-form-item label="任务名称">
      <el-input v-model="taskForm.name" />
    </el-form-item>
    <el-form-item label="任务描述">
      <el-input v-model="taskForm.description" />
    </el-form-item>
    <el-form-item label="机构名称">
      <el-input v-model="taskForm.orgName" />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
