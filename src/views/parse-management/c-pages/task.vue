<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { SuccessFilled } from '@element-plus/icons-vue'

import Loading from '@/components/svg/loading.vue'
import ViewTask from '../c-cpns/view-task/index.vue'

import { getTaskListApi } from '@/services'
import { getImportTypeText } from '@/utils/format'

defineOptions({
  name: 'TaskManagement'
})

const router = useRouter()

const page = reactive({
  current: 1,
  total: 10
})
const taskList = ref([])
const viewRef = ref(null)

const loadData = async () => {
  const result = await getTaskListApi(page.current, page.total)
  const data = result.data
  taskList.value = data.dataList
  page.total = data.totalCount
}

loadData()

// 跳转至创建任务
const goCreateTask = () => {
  router.push({ path: '/create-parse-task' })
}

// 查询任务详情
const handleSeeTaskInfo = (task) => {
  viewRef.value.open(task.parseTaskId)
}

// 切换页
const handlePageChange = (current, total) => {
  page.current = current
  page.total = total
  loadData()
}
</script>

<template>
  <div class="task">
    <!-- 查看 -->
    <ViewTask ref="viewRef" />

    <!-- 按钮 -->
    <div class="btn-wrapper">
      <el-button type="primary" @click="goCreateTask">创建解析任务</el-button>
    </div>

    <div class="table-list">
      <el-table class="custom-table" :data="taskList" style="width: 100%; height: 100%">
        <!-- 序号列 -->
        <el-table-column label="序号" width="66" align="center">
          <template #default="scope"> {{ scope.$index + 1 }} </template>
        </el-table-column>

        <el-table-column prop="name" label="任务名称" align="center" />

        <el-table-column prop="description" label="任务描述" align="center">
          <template #default="{ row }">
            {{ row.description }}
          </template>
        </el-table-column>

        <el-table-column prop="sampleNum" label="样本量" align="center" />

        <el-table-column prop="sampleImportType" label="导入方式" align="center">
          <template #default="{ row }">
            {{ getImportTypeText(row.sampleImportType) }}
          </template>
        </el-table-column>

        <el-table-column prop="gmtCreated" label="创建时间" align="center" />

        <el-table-column prop="status" label="任务状态" align="center">
          <template #default="{ row }">
            <span class="status-icon">
              <Loading v-if="row.status === 0" />
              <el-icon color="#23b85c" v-if="row.status === 2"><SuccessFilled /></el-icon>
            </span>
            <span>{{
              row.status === 0
                ? '待解析'
                : row.status === 1
                  ? '正在解析'
                  : row.status === 2
                    ? '已完成'
                    : '未知'
            }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="230">
          <template #default="{ row }">
            <el-button
              type="info"
              disabled
              size="small"
              :link="true"
              @click="handleSeeTaskInfo(row)"
              >重新开始</el-button
            >
            <el-button
              type="info"
              disabled
              size="small"
              :link="true"
              @click="handleSeeTaskInfo(row)"
              >错位日志</el-button
            >
            <el-button
              type="info"
              disabled
              size="small"
              :link="true"
              @click="handleSeeTaskInfo(row)"
              >删除</el-button
            >
            <el-button type="primary" size="small" :link="true" @click="handleSeeTaskInfo(row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        @change="handlePageChange"
        :page-sizes="[10, 20, 50, 100]"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task {
  height: 100%;
  padding: 6px 20px;
  .btn-wrapper {
    margin-bottom: 12px;
  }

  .table-list {
    height: calc(100% - 110px);
    :deep(.custom-table.el-table th.el-table__cell) {
      background-color: #eff5fa;
      font-size: 13px;
    }
  }

  .status-icon {
    margin-right: 6px;
    position: relative;
    top: 2px;
  }

  .pagination-container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: end;
  }
}
</style>
