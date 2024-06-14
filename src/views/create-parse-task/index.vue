<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Back } from '@element-plus/icons-vue'

import PageSwitch from '@/components/page-switch/index.vue'
import LeftForm from './left-form.vue'
import PreviewData from './preview-data.vue'

import { getSampleListApi, saveTaskApi } from '@/services'

defineOptions({
  name: 'CreateParseTask'
})

const router = useRouter()

const taskRef = ref(null)
const buttonDisabled = ref(true)
const page = reactive({
  current: 1,
  total: 0
})
const dataList = ref(null)
const sampleSource = ref('')

const handleBack = () => {
  router.back()
}

// 按钮激活
const toggleButtonDisabled = (flag) => {
  buttonDisabled.value = flag
}

// 处理数据预览
const handleDataPreview = async (orgName, sampleFileId) => {
  sampleSource.value = sampleFileId
  const result = await getSampleListApi({
    orgName,
    sampleSource,
    pageNum: 1,
    pageSize: 50
  })
  dataList.value = result.data.dataList
  page.total = result.data.rows
  ElMessage.success('获取数据成功')
}

// 处理创建任务
const handleStartTask = async () => {
  const { taskForm } = taskRef.value
  const data = {
    name: taskForm.name,
    description: taskForm.description,
    orgName: taskForm.orgName,
    sampleImportType: 1,
    sampleSource: sampleSource.value
  }
  await saveTaskApi(data)
  ElMessage.success('创建任务成功')
  setTimeout(() => {
    handleBack()
  }, 2000)
}

// 处理预览切换页面
const handlePageChange = (current) => {
  page.current = current
}
</script>

<template>
  <div class="create-parse-task">
    <div class="back">
      <el-icon @click="handleBack" size="32" class="arrow"><Back /></el-icon>
      <span class="text">创建解析任务</span>
    </div>

    <div class="main-content">
      <!-- 左侧表单 -->
      <div class="left">
        <LeftForm
          ref="taskRef"
          @toggle-button-disabled="toggleButtonDisabled"
          @data-preview="handleDataPreview"
        />
      </div>

      <!-- 右侧预览 -->
      <div class="right">
        <div class="preview">
          <div class="header">
            <div class="title">数据预览</div>
            <div class="page" v-show="page.total >= 1">
              <PageSwitch :total="page.total" @page-change="handlePageChange" />
            </div>
          </div>

          <div class="content">
            <div v-if="dataList?.length" class="preview-main">
              <PreviewData :data="dataList[page.current - 1]" />
            </div>
            <div v-else class="placeholder">
              <el-empty
                v-if="buttonDisabled || !dataList"
                description="导入数据后，点击【数据预览】可查看"
              />
              <el-empty v-else description="暂无数据" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <el-button type="primary" :disabled="buttonDisabled" @click="handleStartTask"
        >开始任务</el-button
      >
      <el-button @click="handleBack" type="default">取消</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.create-parse-task {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  .back {
    height: 36px;
    display: flex;
    align-items: center;

    .arrow {
      margin-right: 16px;
      cursor: pointer;
    }

    .text {
      font-size: 22px;
    }
  }

  .main-content {
    flex: 1;
    overflow: hidden;
    background-color: white;
    border-radius: 4px;
    display: flex;
    padding: 10px;

    .left {
      height: 100%;
      width: 450px;
      flex-shrink: 0;
      border-right: 1px solid #e6e6e6;
      padding: 0 22px 0 8px;
    }

    .right {
      height: 100%;
      flex: 1;
      padding: 0 10px 0 20px;

      .preview {
        height: 100%;
        border-radius: 4px;
        padding: 2px 2px 0 6px;
        background-color: #fafafa;
      }

      .preview .header {
        display: flex;
        align-items: center;
        width: 100%;
        position: relative;
      }

      .preview .header .page {
        position: absolute;
        margin-left: 50%;
        transform: translateX(-50%);
      }

      .preview .header .title {
        padding: 10px;
        display: flex;
        align-items: center;

        &::before {
          content: '';
          display: inline-block;
          margin-right: 10px;
          border-radius: 2px;
          height: 18px;
          width: 3px;
          background-color: #409eff;
        }
      }

      .preview .content {
        flex: 1;
        height: calc(100% - 48px);
        box-sizing: border-box;
        flex-shrink: 0;
      }

      .preview .content .preview-main {
        height: 100%;
        padding: 2px 0 0 4px;
      }

      .preview .content .placeholder {
        width: 100%;
        height: 76%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .footer {
    height: 60px;
    line-height: 55px;
    text-align: center;
    background-color: white;
    border-radius: 4px;
  }
}
</style>
