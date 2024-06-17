<script setup>
import { ref } from 'vue'

import UploadPreview from '@/components/upload-preview/index.vue'

import { getTaskInfoApi } from '@/services'
import { getImportTypeText } from '@/utils/format'

const visible = ref(false)
const taskInfo = ref({})

const open = (parseTaskId) => {
  visible.value = true
  loadData(parseTaskId)
}

const loadData = async (id) => {
  const result = await getTaskInfoApi(id)
  taskInfo.value = result.data
}

defineExpose({ open })
</script>

<template>
  <el-drawer v-model="visible" title="I am thsse title">
    <template #header>
      <h4 class="title">查看详情</h4>
    </template>

    <template #default>
      <div class="list">
        <div class="item">
          <div class="label">任务名称：</div>
          <div class="value">{{ taskInfo.name }}</div>
        </div>

        <div class="item">
          <div class="label">任务描述：</div>
          <div class="value">{{ taskInfo.description }}</div>
        </div>

        <div class="item">
          <div class="label">导入方式：</div>
          <div class="value">{{ getImportTypeText(taskInfo.sampleImportType) }}</div>
        </div>

        <div class="item sample-file">
          <div class="label">上传文件：</div>
          <div class="value">
            <UploadPreview :file-info="taskInfo.sampleFile" />
          </div>
        </div>

        <div class="item template">
          <div class="label">解析模板：</div>
          <div class="value">
            <template
              v-for="(item, index) in taskInfo.templateConfigs"
              :key="item.templateConfigName"
            >
              <div class="template-record">
                <span class="sample-name">{{ index + 1 }}.{{ item.recordType }}</span>
                <span class="sample-num">样本数量：{{ item.matchSampleNum }}</span>
              </div>
            </template>
          </div>
        </div>

        <div class="item task-status">
          <div class="label">任务状态：</div>
          <div class="value">
            {{
              taskInfo.status === 0
                ? '任务尚未完成'
                : taskInfo.status === 1
                  ? '任务正在执行'
                  : taskInfo.status === 2
                    ? '任务已完成'
                    : '未知'
            }}
          </div>
        </div>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
.title {
  color: #333;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 26px;

  .item {
    display: flex;
    align-items: center;
  }

  .item.sample-file,
  .item.template {
    align-items: start;
  }

  .item .label {
    width: 80px;
    font-weight: bold;
    font-size: 13px;
  }

  .item .value {
    width: calc(100% - 86px);
  }

  .item.sample-file .value {
    max-width: 300px;
  }

  .template-record {
    position: relative;
    top: -5px;
    width: 100%;
    line-height: 28px;
    display: flex;
    .sample-name {
      width: 40%;
    }

    .sample-num {
      margin-left: 26px;
    }
  }

  .task-status {
    display: flex;
    align-items: center;

    .value {
      color: #a92ed3;
      font-size: 15px;
    }
  }
}
</style>
