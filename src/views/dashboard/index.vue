<script setup>
import { ref, reactive } from 'vue'

import CreateParseTask from '@/components/create-parse-task/index.vue'
import TemplateList from './template-list.vue'

import { getSampleTypeListApi, getAvailibleTemplateApi } from '@/services'

defineOptions({
  name: 'Dashboard'
})

const searchParams = reactive({
  orgName: '',
  recordType: ''
})
const orgList = ref([])
const recordTypeList = ref([])
const templateList = ref([])
const action = ref('create')

// 获取查询下拉框数据
const getSelectData = async () => {
  const result = await getSampleTypeListApi()
  orgList.value = result.data.orgList
  recordTypeList.value = result.data.recordTypeList
}

// 查询可用的模板
const getTemplateList = async () => {
  const result = await getAvailibleTemplateApi(searchParams.orgName, searchParams.recordType)
  templateList.value = result.data
  console.log(result)
}

// 初始化
const loadData = async () => {
  getSelectData()
  getTemplateList()
}

loadData()

const handleCreateTaskBack = () => {
  action.value = 'query'
}
</script>

<template>
  <!-- 任务列表 -->
  <template v-if="action === 'query'">
    <div class="dashboard">
      <!-- 查询条件 -->
      <div class="header">
        <el-form :model="searchParams" inline>
          <el-form-item label="机构名称:">
            <el-select
              v-model="searchParams.orgName"
              placeholder="请选择机构名称"
              style="width: 200px"
            >
              <el-option v-for="item in orgList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>

          <el-form-item label="文书类型:">
            <el-select
              filterable
              v-model="searchParams.recordType"
              placeholder="请选择文书类型"
              style="width: 200px"
            >
              <el-option v-for="item in recordTypeList" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <!-- 内容 -->
      <div class="content">
        <div class="btns">
          <el-button type="primary" @click="action = 'create'">创建解析任务</el-button>
        </div>

        <div class="list">
          <TemplateList v-if="templateList.length" :list="templateList" />
          <el-empty class="placeholder" v-else description="暂无数据" />
        </div>
      </div>
    </div>
  </template>

  <!-- 创建任务 -->
  <template v-else-if="action === 'create'">
    <CreateParseTask @create-task-back="handleCreateTaskBack" />
  </template>
</template>

<style scoped lang="scss">
.dashboard {
  height: 100%;
  background-color: white;
  border-radius: 4px;
  padding: 22px 18px;
  box-sizing: border-box;

  .header {
    height: 50px;
    border-bottom: 1px solid #d6d6d6;
    box-sizing: border-box;
  }

  .content {
    box-sizing: border-box;
    padding-top: 16px;
    height: calc(100% - 36px);
    .btns {
      margin-bottom: 14px;
    }
    .list {
      height: calc(100% - 46px);
    }
    .list .placeholder {
      height: 80%;
    }
  }
}
</style>
