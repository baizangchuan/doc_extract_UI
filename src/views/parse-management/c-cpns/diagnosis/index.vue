<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const visible = ref(false)
const formRef = ref()
const orgList = ref([])

const router = useRouter()

const formData = reactive({
  orgName: ''
})

const open = (data) => {
  visible.value = true
  orgList.value = data
}

const close = () => {
  visible.value = false
  formData.orgName = ''
  formRef.value.resetFields()
}

// 处理点击确定
const handleOk = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      router.push({
        name: 'SimilarityDiagnosis',
        params: {
          orgName: formData.orgName
        }
      })
      close()
    }
  })
}

defineExpose({ open, close })
</script>

<template>
  <el-dialog v-model="visible" title="相似度诊断" width="500">
    <el-form
      class="form"
      ref="formRef"
      style="max-width: 600px"
      :model="formData"
      :rules="{ orgName: [{ required: true, message: '请选择' }] }"
      status-icon
    >
      <el-form-item label="诊断范围" prop="orgName" required>
        <el-select v-model="formData.orgName" placeholder="请选择">
          <template v-for="item in orgList" :key="item">
            <el-option :label="item" :value="item" />
          </template>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleOk"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.form {
  padding: 34px 0 0;
}
</style>
