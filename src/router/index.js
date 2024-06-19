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
          component: () => import('@/views/dashboard/index.vue')
        },
        {
          path: '/parse-management',
          name: 'ParseManagement',
          component: () => import('@/views/parse-management/index.vue')
        },
        {
          path: '/create-parse-task',
          name: 'CreateParseTask',
          component: () => import('@/views/create-parse-task/index.vue')
        },
        {
          path: '/view/medical/:id/:type/:taskName/:orgName/:rectifiedTime',
          name: 'ViewMedical',
          component: () => import('@/views/view-correction-medical/index.vue')
        }
      ]
    }
  ]
})

export default router
