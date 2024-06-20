<script setup>
import { useRoute } from 'vue-router'
import { compareTemplateApi } from '@/services'

defineOptions({
  name: 'SimilarityDiagnosis'
})

const route = useRoute()
const params = route.params

const loadData = async () => {
  const result = await compareTemplateApi(params.orgName)
  console.log(result)
}
loadData()
</script>

<template>
  <div>相似度诊断</div>
</template>

<style scoped lang="scss"></style>
