import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: '/dashboard',
          name: 'Dashboard',
          component: () => import('@/views/dashboard/index.vue'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/parse-management',
          name: 'ParseManagement',
          component: () => import('@/views/parse-management/index.vue'),
          meta: {
            title: '解析管理'
          }
        },
        {
          path: '/create-parse-task',
          name: 'CreateParseTask',
          component: () => import('@/views/create-parse-task/index.vue'),
          meta: {
            title: '创建解析任务'
          }
        },
        {
          path: '/view/medical/:id/:type/:taskName/:orgName/:rectifiedTime',
          name: 'ViewMedical',
          component: () => import('@/views/view-correction-medical/index.vue'),
          meta: {
            title: '模板详情'
          }
        },
        {
          path: '/similarity-diagnosis/:orgName',
          name: 'SimilarityDiagnosis',
          component: () => import('@/views/similarity-diagnosis/index.vue'),
          meta: {
            title: '相似度诊断'
          }
        }
      ]
    }
  ]
})

export default router
