<template>
  <div class="right-template">
    <div class="header">
      <div class="left">解析病历模板</div>
      <div class="right" v-if="correctionFlag">
        <el-button @click="handleAdd">
          <el-icon><Plus /></el-icon>
          <span class="text">新增</span>
        </el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="nodeList" class="custom-table" style="width: 100%; height: 100%" border>
        <!-- ... existing columns ... -->

        <el-table-column label="操作" align="center">
          <template #default="{ row, $index }">
            <div>
              <el-button type="danger" size="small" :link="true" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button type="primary" size="small" @click="handleAddRow($index)">
                新增一行
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="bottom">
      <div class="btns">
        <el-button type="default" plain @click="handleCancel">
          <span>{{ correctionFlag ? '取消' : '关闭' }}</span>
        </el-button>
        <el-button v-if="correctionFlag" type="primary" @click="handleSave">
          <span>保存</span>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
// ... existing imports and setup ...

// 新增一行
const handleAddRow = (index) => {
  nodeList.value.splice(index + 1, 0, {});
}

// ... existing methods ...
</script> 