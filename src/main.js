import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

import 'element-plus/dist/index.css'
import 'normalize.css'

import App from './App.vue'
import router from './router'

import '@/assets/css/index.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
