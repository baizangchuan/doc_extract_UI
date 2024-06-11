<script setup>
import { Plus } from '@element-plus/icons-vue'

defineOptions({
  name: 'RightTemplate'
})
</script>

<template>
  <div class="right-template">
    <div class="header">
      <div class="left">解析病历模板</div>
      <div class="right">
        <el-button style="border-color: #409eff">
          <el-icon color="#409eff"><Plus /></el-icon>
          <span class="text">新增</span>
        </el-button>
      </div>
    </div>

    <div class="content"></div>

    <div class="bottom">
      <div class="btns">
        <el-button type="default">取消</el-button>
        <el-button type="primary">保存</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.right-template {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 58px;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      font-size: 16px;
      font-weight: bold;
    }

    .right {
      display: flex;
      align-items: center;
    }

    .right .text {
      color: #409eff;
      position: relative;
      top: 1px;
    }
  }

  .content {
    flex: 1;
  }

  .bottom {
    border-top: 8px solid #f5f5f5;
    height: 58px;
    line-height: 58px;
    text-align: right;
  }
}
</style>
