import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import router from '@/router'
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
  },
  // axios 默认发送请求的时候不会带上cookie，需要设置withCredentials为true来解决。
  withCredentials: true
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data
    if (res.status !== 1) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })

      if (res.code === 302) {
        Message({
          message: '请先登录',
          type: 'error',
          duration: 5 * 1000
        })
      }
      router.push({
        path: '/login'
      })
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message || '请登录',
      type: 'error',
      duration: 5 * 1000
    })
    router.push({
      path: '/login'
    })
    return Promise.reject(error)
  }
)

export default service
