<script setup>
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import SelectInput from '@/components/select-input.vue'

import { saveTemplateApi } from '@/services'

defineOptions({
  name: 'RightTemplate'
})

const props = defineProps({
  type: {
    type: String,
    default: ''
  },
  info: {
    type: Object,
    default: () => ({})
  },
  configNodeList: {
    type: Array,
    default: () => []
  }
})

watch(
  () => props.configNodeList,
  (value) => {
    nodeList.value = value
  }
)

const nodeList = ref([])

const correctionFlag = computed(() => props.type === 'correction')

const router = useRouter()

// 取消
const handleCancel = () => {
  router.back()
}

// 新增
const handleAdd = () => {
  nodeList.value.unshift({})
}

// 删除
const handleDelete = (row) => {
  const newNodeList = nodeList.value.filter((item) => item !== row)
  nodeList.value = newNodeList
}

const handleSave = async () => {
  let flag = false
  for (const item of nodeList.value) {
    if (!item.configNodeKey || !item.admColumn) {
      flag = true
      break
    }
  }
  if (flag) {
    ElMessage.warning('请填写完整模板信息')
    return
  }
  const data = {
    templateConfigId: props.info.templateConfigId,
    templateConfigName: props.info.templateConfigName,
    configNodes: nodeList.value
  }
  await saveTemplateApi(data)
  ElMessage.success('保存成功')
  router.back()
}
</script>

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
        <el-table-column :width="200" prop="configNodeKey" label="名称" align="center">
          <template #default="{ row }">
            <span v-if="correctionFlag">
              <el-input v-model="row.configNodeKey" placeholder="请输入名称" />
            </span>
            <span v-else>{{ row.configNodeKey }}</span>
          </template>
        </el-table-column>

        <el-table-column :width="200" prop="admColumn" label="标准schema" align="center">
          <template #default="{ row }">
            <span v-if="correctionFlag">
              <SelectInput :no-value="true" v-model="row.admColumn" :show-select="false" />
            </span>
            <span v-else>{{ row.admColumn }}</span>
          </template>
        </el-table-column>

        <el-table-column :width="200" prop="configNodeType" label="所属的上级节点" align="center">
          <template #default="{ row }">
            <span>{{ row.firstNode || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column
          :width="200"
          prop="configNodeType"
          label="是否直接取匹配内容"
          align="center"
        >
          <template #default="{ row }">
            <span>{{ row.isRegular || '-' }}</span>
          </template>
        </el-table-column>

        <el-table-column :width="160" prop="matchSampleNum" label="样本记录数" align="center" />

        <el-table-column :width="160" prop="repeatInSample" label="内容" align="center">
          <template #default="{ row }">
            {{ row.repeatInSample || '-' }}
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="{ row }">
            <div>
              <el-button type="danger" size="small" :link="true" @click="handleDelete(row)">
                删除
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

<style scoped lang="scss">
.right-template {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    height: 58px;
    padding: 16px 20px;
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
    padding: 2px 20px;
    height: calc(100% - 162px);
    :deep(.custom-table.el-table th.el-table__cell) {
      font-size: 13px;
      background-color: #eff5fa;
    }
  }

  .bottom {
    border-top: 8px solid #f5f5f5;
    height: 58px;
    line-height: 54px;
    text-align: center;

    .btns {
      padding-right: 30px;
    }

    .btns span {
      display: flex;
      padding: 0 10px;
    }
  }
}
</style>
