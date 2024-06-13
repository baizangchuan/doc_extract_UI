<script setup>
import { Back } from '@element-plus/icons-vue'
import LeftForm from './left-form.vue'

const emit = defineEmits(['create-task-back'])

defineOptions({
  name: 'CreateParseTask'
})

const handleBack = () => {
  emit('create-task-back')
}
</script>

<template>
  <div class="create-parse-task">
    <div class="back">
      <el-icon @click="handleBack" size="32" class="arrow"><Back /></el-icon>
      <span class="text">创建解析任务</span>
    </div>

    <div class="content">
      <!-- 左侧表单 -->
      <div class="left">
        <LeftForm />
      </div>

      <!-- 右侧预览 -->
      <div class="right">
        <div class="preview">
          <div class="title">数据预览</div>
          <div class="placeholder">
            <el-empty description="导入数据后，点击【数据预览】可查看" />
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <el-button type="primary">开始任务</el-button>
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

  .content {
    flex: 1;
    background-color: white;
    border-radius: 4px;
    display: flex;
    padding: 10px;

    .left {
      width: 450px;
      border-right: 1px solid #e6e6e6;
    }

    .right {
      flex: 1;
      padding: 0 10px 0 20px;

      .preview {
        height: 100%;
        background-color: #fafafa;
        border-radius: 4px;
        padding: 12px 16px;
      }

      .preview .title {
        display: flex;
        align-items: center;
      }

      .preview .title::before {
        content: '';
        display: inline-block;
        margin-right: 10px;
        border-radius: 2px;
        height: 18px;
        width: 3px;
        background-color: #409eff;
      }

      .placeholder {
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
