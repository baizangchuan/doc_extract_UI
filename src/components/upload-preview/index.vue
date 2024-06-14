<script setup>
import { Close } from '@element-plus/icons-vue'
import CompressedFileSvg from '@/assets/svg/compressed-file.svg'

defineOptions({
  name: 'UploadPreview'
})

defineProps({
  fileInfo: {
    type: Object,
    default: () => ({})
  },
  closeIcon: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close-preview'])

const handleClosePreview = () => {
  emit('close-preview')
}
</script>

<template>
  <div class="upload-preview">
    <div class="icon">
      <img :src="CompressedFileSvg" width="32" height="32" alt="" />
    </div>

    <div class="content">
      <h4>{{ fileInfo.fileName }}</h4>
      <p>文件大小：{{ fileInfo.fileSize }}</p>
      <p>上传时间：{{ fileInfo.gmtCreated }}</p>
      <p>样本总数：{{ fileInfo.sampleNum }}</p>
    </div>

    <div v-if="closeIcon" class="close-icon" @click="handleClosePreview">
      <el-icon><Close /></el-icon>
    </div>
  </div>
</template>

<style scoped lang="scss">
.upload-preview {
  padding: 10px;
  border: 1px solid #dcdfe6;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 2px;

  .icon {
    width: 46px;
  }

  .content {
    flex: 1;
    line-height: 24px;
    font-size: 13px;
    position: relative;
  }

  .content h4 {
    font-size: 14px;
  }

  .close-icon {
    position: absolute;
    right: 10px;
    top: 16px;
    cursor: pointer;
    padding: 2px 6px;
    line-height: 18px;
  }
}
</style>
