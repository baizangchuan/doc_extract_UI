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
        <el-button>
          <el-icon><Plus /></el-icon>
          <span class="text">新增</span>
        </el-button>
      </div>
    </div>

    <div class="content">
      <el-table style="width: 100%" border>
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
      </el-table>
    </div>

    <div class="bottom">
      <div class="btns">
        <el-button type="default" plain>
          <span>取消</span>
        </el-button>
        <el-button type="primary">
          <span>保存</span>
        </el-button>
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
      position: relative;
      top: 1px;
    }
  }

  .content {
    flex: 1;
    padding: 20px;
  }

  .bottom {
    border-top: 8px solid #f5f5f5;
    height: 58px;
    line-height: 58px;
    text-align: right;

    .btns {
      padding-right: 30px;
    }

    .btns span {
      position: relative;
      top: 1px;
      display: flex;
      padding: 0 10px;
    }
  }
}
</style>
