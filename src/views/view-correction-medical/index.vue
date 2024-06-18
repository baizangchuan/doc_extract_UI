<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import LeftText from './left-text.vue'
import RightTemplate from './right-template.vue'

import { getTemplateInfoApi } from '@/services'

import BackSvg from '@/assets/svg/back.svg'
import EditSvg from '@/assets/svg/edit.svg'
import ReportSvg from '@/assets/svg/report.svg'

defineOptions({
  name: 'ViewCorrectionMedical'
})

const router = useRouter()
const route = useRoute()
const params = route.params

const info = ref({})
const configNodeList = ref([])
const matchSampleIdList = ref([])

const loadData = async () => {
  const result = await getTemplateInfoApi(params.id)
  const { configNodes, matchSampleIds, ...rest } = result.data
  configNodeList.value = configNodes
  matchSampleIdList.value = matchSampleIds
  info.value = rest
}
if (params.id) {
  loadData()
}

const handleBack = () => {
  router.back()
}
</script>

<template>
  <div class="view-correction-medical">
    <!-- 头部区域 -->
    <div class="header">
      <el-button>
        <img :src="BackSvg" alt="" />
        <span class="back-text" @click="handleBack">返回</span>
      </el-button>

      <div class="template-name">
        <span class="name">{{ info.templateConfigName }}</span>
        <img :src="EditSvg" width="18" alt="" />
      </div>

      <!-- <div class="status">
        <span>纠错状态：</span>
        <el-tag type="success">已纠错</el-tag>
        <span class="time">2022-06-05 20:04:54</span>
      </div> -->

      <div class="type">
        <span>文书类型：</span>
        <span>{{ info.recordType || '-' }}</span>
      </div>

      <!-- <div class="task">
        <span>所属任务：</span>
        <span>模板</span>
      </div> -->

      <!-- <div class="institution">
        <span>机构名称：</span>
        <span>415801168</span>
      </div> -->

      <!-- 解析报告 -->
      <div class="parse-report">
        <el-button style="border-color: #409eff">
          <img :src="ReportSvg" height="16" alt="" />
          <span class="text">解析报告</span>
        </el-button>
      </div>
    </div>

    <!-- 内容 -->
    <div class="content">
      <div class="left">
        <LeftText :matchSampleIdList="matchSampleIdList" :info="info" />
      </div>
      <div class="right">
        <RightTemplate :configNodeList="configNodeList" :info="info" :type="params.type" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.view-correction-medical {
  height: 100%;
  .header {
    height: 58px;
    padding: 0 10px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 4px;
    display: flex;
    align-items: center;
    position: relative;

    .back-text {
      color: #606266;
      position: relative;
      top: 1px;
      margin-left: 4px;
    }

    .template-name {
      margin: 0 16px;
      .name {
        position: relative;
        top: 1px;
        font-weight: bold;
        margin-right: 4px;
      }
      img {
        position: relative;
        top: 2px;
      }
    }

    .status {
      margin-left: 40px;
      display: flex;
      align-items: center;
      position: relative;
      top: 1px;
    }

    .status .time {
      margin-left: 10px;
      display: flex;
      align-items: center;
    }

    .status .time::after,
    /* .type::after, */
    .task::after {
      content: '';
      display: inline-block;
      height: 22px;
      line-height: 22px;
      margin: 0 12px;
      border-right: 1px solid #d8d8d8;
    }

    .type,
    .task,
    .institution {
      display: flex;
      align-items: center;
      position: relative;
      top: 2px;
    }

    .parse-report {
      position: absolute;
      right: 28px;
      top: 14px;
      display: flex;
      align-items: center;
    }

    .parse-report .text {
      color: #409eff;
      margin-left: 6px;
    }
  }

  .content {
    margin-top: 12px;
    height: calc(100% - 70px);
    display: flex;
    gap: 12px;

    .left {
      height: 100%;
      width: 386px;
      background-color: white;
      border-radius: 4px;
    }

    .right {
      flex: 1;
      height: 100%;
      background-color: white;
      border-radius: 4px;
    }
  }
}
</style>
