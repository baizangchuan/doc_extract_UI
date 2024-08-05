<script setup>
import TaskSvg from '@/assets/svg/task.svg'

defineOptions({ name: 'TemplateList' })

defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <el-scrollbar height="100%">
    <div class="list">
      <template v-for="item in list" :key="item.parseTaskId">
        <div class="item">
          <div class="left"><img :src="TaskSvg" alt="" /></div>
          <div class="right">
            <h4 class="code">{{ item.templateConfigCode }}</h4>
            <h4 class="type">
              <span class="label">文书类型：</span>
              <span class="value">{{ item.recordType }}</span>
            </h4>
            <h4 class="count">
              <div>
                <span class="label">样板数量：</span>
                <span class="value">{{ item.matchSampleNum }}</span>
              </div>

              <div>
                <span class="label">Key数量：</span>
                <span class="value">{{ item.nodeCount || '-' }}</span>
              </div>
            </h4>
            <h4 class="update-time">
              <span class="label">修改时间：</span>
              <span class="value">{{ item.rectifiedTime }}</span>
            </h4>
          </div>
        </div>
      </template>
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.list {
  padding-right: 12px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 36px 18px;

  .item {
    height: 100%;
    border: 1px solid #e6e6e6;
    border-radius: 4px;
    display: flex;
    background-color: #f8fdfd;
    box-sizing: border-box;

    .left {
      height: 100%;
      width: 110px;
      padding: 22px;
      box-sizing: border-box;
      text-align: center;
    }

    .right .code {
      font-size: 14px;
      font-weight: 500;
    }

    .right {
      height: 100%;
      flex: 1;
      background-color: white;
      padding: 8px 12px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      flex-direction: column;
      gap: 8px;
    }

    .right .label {
      font-weight: bold;
      font-size: 12px;
    }

    .right .value {
      font-weight: normal;
    }

    .right .count {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      font-weight: 500;
    }

    .update-time .value {
      font-size: 12px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
