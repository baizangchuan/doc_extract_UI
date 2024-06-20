<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

import Diagnosis from '../c-cpns/diagnosis/index.vue'

import { getSampleTypeListApi, getTemplateListApi, deleteTemplateApi } from '@/services'

defineOptions({
  name: 'TemplateManagement'
})

const router = useRouter()

const searchParams = reactive({
  pageNum: 1,
  pageSize: 20,
  keyword: '',
  orgName: '',
  recordType: ''
})

// 查看类型
const viewType = ref('correction')

// 正在操作的行数据
const operRow = ref()

const templateList = ref([])
const total = ref(0)
const orgList = ref([])
const recordTypeList = ref([])

const diagnosisRef = ref()

// 获取查询下拉框数据
const getSelectData = async () => {
  const result = await getSampleTypeListApi()
  orgList.value = result.data.orgList
  recordTypeList.value = (result.data.recordTypeList || []).filter(Boolean)
}
getSelectData()

const loadData = async () => {
  // 获取模板列表
  const availableKeys = Object.keys(searchParams).filter((item) => searchParams[item])
  const params = {}
  availableKeys.forEach((key) => {
    params[key] = searchParams[key]
  })
  const result = await getTemplateListApi(params)
  templateList.value = result.data.dataList
  total.value = result.data.totalCount
}
loadData()

// 切换页码
const handlePageChange = (current, pageSize) => {
  searchParams.pageNum = current
  searchParams.pageSize = pageSize
  loadData()
}

// 重置
const handleReset = () => {
  searchParams.keyword = ''
  searchParams.orgName = ''
  searchParams.recordType = ''
  loadData()
}

// 处理查看/模板纠错
const handleView = (row, type) => {
  operRow.value = row
  viewType.value = type
  router.push({
    name: 'ViewMedical',
    params: {
      id: encodeURIComponent(row.templateConfigId),
      type: encodeURIComponent(type),
      rectifiedTime: encodeURIComponent(row.rectifiedTime || '0'),
      taskName: encodeURIComponent(row.parseTaskName),
      orgName: encodeURIComponent(row.orgName)
    }
  })
}

// 处理删除
const handleDelete = (row) => {
  ElMessageBox.confirm('您确定要删除吗？删除之后模板将不可用', {
    type: 'warning'
  })
    .then(async () => {
      console.log(row.templateConfigId)
      await deleteTemplateApi(row.templateConfigId)
      ElMessage.success('删除成功')
      loadData()
    })
    .catch(() => {})
}

// 相似度诊断点击
const handleSimilarityClick = () => {
  diagnosisRef.value.open(orgList.value)
}
</script>

<template>
  <div class="template">
    <!-- 相似度诊断 -->
    <Diagnosis ref="diagnosisRef" />

    <!-- 搜索表单 -->
    <div class="header">
      <el-form :model="searchParams" inline>
        <el-form-item label="任务名称:">
          <el-input
            v-model="searchParams.keyword"
            placeholder="请输入任务名称"
            style="width: 200px"
          />
        </el-form-item>

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

        <el-form-item>
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button type="default" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 相似度 -->
    <div class="similarity">
      <el-button type="primary" @click="handleSimilarityClick">相似度诊断</el-button>
    </div>

    <!-- 表格 -->
    <div class="table-list">
      <el-table class="custom-table" :data="templateList" style="width: 100%; height: 100%">
        <!-- 序号列 -->
        <el-table-column label="序号" width="66" align="center">
          <template #default="scope"> {{ scope.$index + 1 }} </template>
        </el-table-column>

        <el-table-column prop="templateConfigName" label="模板名称" align="center" />

        <el-table-column prop="matchSampleNum" label="样板病例数" align="center" />

        <el-table-column prop="recordType" label="文书类型" align="center">
          <template #default="{ row }"> {{ row.recordType || '----' }} </template>
        </el-table-column>

        <el-table-column prop="parseTaskName" label="所属任务" align="center" />

        <el-table-column prop="orgName" label="机构名称" align="center" />

        <el-table-column prop="rectifiedTime" label="纠错状态" align="center">
          <template #default="{ row }">
            <span class="correction" v-if="row.rectifiedTime">已纠错({{ row.rectifiedTime }}</span>
            <span class="correction" v-else>----</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230">
          <template #default="{ row }">
            <el-button type="primary" size="small" :link="true" @click="handleView(row, 'simple')"
              >查看</el-button
            >
            <el-button
              type="primary"
              size="small"
              :link="true"
              @click="handleView(row, 'correction')"
              >模板纠错</el-button
            >
            <el-button type="danger" size="small" :link="true" @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @change="handlePageChange"
        :page-sizes="[10, 20, 50, 100]"
        :default-page-size="searchParams.pageSize"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.template {
  height: 100%;
  padding: 10px 18px 0;
  box-sizing: border-box;

  .header {
    height: 50px;
    border-bottom: 1px solid #d6d6d6;
    box-sizing: border-box;
  }

  .similarity {
    padding: 14px 0;
  }

  .table-list {
    height: calc(100% - 170px);
    :deep(.custom-table.el-table th.el-table__cell) {
      font-size: 13px;
      background-color: #eff5fa;
    }
  }

  .pagination-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
