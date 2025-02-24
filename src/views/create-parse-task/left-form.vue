<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

import UploadPreview from '@/components/upload-preview/index.vue'

const emit = defineEmits(['toggle-button-disabled', 'data-preview'])

defineOptions({
  name: 'LeftForm'
})

const rules = {
  name: [{ required: true, message: '请输入任务名称' }],
  description: [{ required: true, message: '请输入任务描述' }],
  orgName: [{ required: true, message: '请输入机构名称' }]
}

const formRef = ref(null)
const uploadRef = ref(null)
const uploadResult = ref(null)
const orgList = ref([])
const taskForm = reactive({
  name: '',
  description: '',
  orgName: ''
})
const buttonDisabled = ref(true)

// 上传成功响应的回调
const handleUploadSuccess = (response) => {
  if (response.resultCode === '0') {
    uploadResult.value = response.data
    orgList.value = response.data.orgList
  } else {
    uploadResult.value = null
    uploadRef.value.clearFiles()
    ElMessage.warning(response.resultMsg)
  }
}

// 清除文件
const handleCleanFile = () => {
  uploadResult.value = null
  uploadRef.value.clearFiles()
}

// 校验表单
const validateForm = () => {
  const { name, description, orgName } = taskForm
  const flag = name && description && orgName
  buttonDisabled.value = !flag
  emit('toggle-button-disabled', !flag)
}

// 处理预览
const handlePreview = async () => {
  emit('data-preview', taskForm.orgName, uploadResult.value?.sampleFileId)
}

defineExpose({
  taskForm
})
</script>

<template>
  <el-form
    style="max-width: 600px"
    ref="formRef"
    :trigger="['input', 'blur']"
    :model="taskForm"
    :rules="rules"
    label-width="auto"
  >
    <el-form-item label="任务名称：" prop="name">
      <el-input
        clearable
        v-model="taskForm.name"
        placeholder="请输入任务名称"
        @blur="validateForm"
      />
    </el-form-item>

    <el-form-item label="任务描述：" prop="description">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        v-model="taskForm.description"
        placeholder="请输入任务描述"
        @blur="validateForm"
      />
    </el-form-item>

    <el-form-item label="文件上传：" required>
      <el-upload
        drag
        ref="uploadRef"
        v-show="!uploadResult"
        class="upload-demo"
        name="file"
        accept=".xls,.xlsx,.csv,.zip"
        action="/api/sample/upload"
        :on-success="handleUploadSuccess"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          <div>将填好的文件拖拽到这里上传 或点击上传按钮</div>
          <div class="el-upload__btn">
            <el-button type="primary">上传文件</el-button>
          </div>
          <div class="el-upload__tip">
            上传文件类型支持压缩包格式: .xls, .xlsx, .csv, .zip；压缩包内文书
            格式支持txt、xml、html，仅支持单次上传一个文件
          </div>
        </div>
      </el-upload>

      <template v-if="uploadResult">
        <UploadPreview
          :close-icon="true"
          :file-info="uploadResult"
          @close-preview="handleCleanFile"
        />
      </template>
    </el-form-item>

    <el-form-item label="机构名称：" prop="orgName">
      <el-select v-model="taskForm.orgName" @change="validateForm">
        <el-option v-for="item in orgList" :key="item" :label="item" :value="item" />
      </el-select>
    </el-form-item>
  </el-form>

  <div class="preview-btn">
    <el-button type="primary" :disabled="buttonDisabled" @click="handlePreview">数据预览</el-button>
  </div>
</template>

<style scoped>
.el-upload__btn {
  margin-top: 4px;
}

.el-upload__tip {
  line-height: 20px;
}

.preview-btn {
  margin-left: 98px;
}
</style>
