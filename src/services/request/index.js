import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { BASE_URL, TIME_OUT } from './config'
import { ElMessage } from 'element-plus'

class SpdRequest {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      (config) => {
        NProgress.start()
        return config
      },
      (err) => {
        NProgress.done()
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        NProgress.done()
        const body = res.data
        if (body.resultCode !== '0') {
          ElMessage.error(body.resultMsg)
          return Promise.reject()
        }
        return res.data
      },
      (err) => {
        NProgress.done()
        return err
      }
    )
  }

  request(config) {
    return this.instance.request(config)
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}

export default new SpdRequest(BASE_URL, TIME_OUT)
