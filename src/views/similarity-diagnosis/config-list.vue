<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  templateConfigList: {
    type: Array,
    default: () => []
  }
})

// 表格列数据
const columns = ref([])
// 表格数据
const tableList = ref([])

watch(
  () => props.templateConfigList,
  (data) => {
    if (data.length) {
      processData(data)
    }
  },
  {
    immediate: true
  }
)

// 加工数据
const processData = (data) => {
  // 组装表格列数据
  columns.value = data.map((item, index) => {
    return {
      prop: 'configNodeKey' + (index + 1),
      label: item.templateConfigName
    }
  })

  // 组装表格行数据
  const rowLength = data[0].configNodes?.length || 0
  const rows = []
  for (let i = 0; i < rowLength; i++) {
    const row = {}
    let isSame = true
    let text = data[0].configNodes[i].configNodeKey
    for (let j = 0; j < data.length; j++) {
      const { configNodes, ...rest } = data[j]
      row['configNodeKey' + (j + 1)] = { node: configNodes[i], ...rest }
      if (configNodes[i]?.configNodeKey !== text) {
        isSame = false
      }
    }
    row.isSame = isSame
    rows.push(row)
  }
  tableList.value = rows
}
</script>

<template>
  <el-table :data="tableList" style="width: 100%; height: 100%">
    <template v-for="(item, index) in columns" :key="item.prop">
      <el-table-column show-overflow-tooltip :prop="item.prop" :label="item.label">
        <template #default="{ row }">
          <span :class="{ 'not-same': !row.isSame }">
            {{ row['configNodeKey' + (index + 1)]?.node?.configNodeKey || '-' }}
          </span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style scoped lang="scss">
.not-same {
  color: red;
}
</style>
