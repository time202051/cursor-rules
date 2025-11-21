import axios from 'axios'
import Qs from 'qs'
import { Message } from 'element-ui'
import { hideFullScreenLoading } from '@/utils/loading';

// let timer = 120000;
const $axios = axios.create({
  headers: {
    'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
    'Accept': 'application/json;odata.metadata=minimal;odata.streaming=true'
  },
  // timeout: timer,
  paramsSerializer: function(params) { // 配置参数序列化
    return Qs.stringify(params, { arrayFormat: 'repeat' })
  }
})
// 添加一个请求拦截器
$axios.interceptors.request.use(function(config) {
  return config
}, function(error) {
  hideFullScreenLoading()
  return Promise.reject(error)
})
// 添加一个响应拦截器
$axios.interceptors.response.use(res => {
  if (res.status === 200) {
    return Promise.resolve(res)
  } else {
    return Promise.reject(res)
  }
}, err => {
  var originalRequest = err.config
  hideFullScreenLoading()
  if (err.code === 'ECONNABORTED' && err.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    originalRequest._retry = true
    Message({
      message: '网络超时,请稍后重试',
      type: 'error',
      duration: 5 * 1000
    })
  } else if (!err.response) {
    Message({
      message: '服务器遇到错误，无法完成请求',
      type: 'error',
      duration: 5 * 1000
    })
  } else if (err.response.status) {
    const status = err.response.status
    switch (status) {
      case 404:
        Message({
          message: '访问地址已失效,请重试',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 500:
        Message({
          message: '服务器遇到错误，无法完成请求',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 403:
        Message({
          message: '权限不足,请联系管理员!',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 401 :
        Message({
          message: '请求失败!',
          type: 'error',
          duration: 5 * 1000
        })
        break
      case 405:
        Message({
          message: '服务器遇到错误，无法完成请求',
          type: 'error',
          duration: 5 * 1000
        })
        break
    }
  }
})

export default $axios
