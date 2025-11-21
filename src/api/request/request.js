import axios from '@/api/request/axios'
import store from '@/store'
import { MessageBox, Message, Col } from 'element-ui'
import {
  showFullScreenLoading,
  hideFullScreenLoading
} from '@/utils/loading';
/** 未完成
 * 刷新token
*/

/**
 *
 * @param {//通用请求的方法 } param
 * @returns
 */

export function request(param) {
  let wms = JSON.parse(localStorage.getItem('wms'))
  let hasToken = null
  if (wms) hasToken = wms.SET_TOKEN
  if (param.isLoading) showFullScreenLoading()
  const defaultConfig = {
    method: 'post',
    isLoading: false,
    responseType: 'json',
    timeout: 120000,
    headers: {
      'Accept': 'application/json;odata.metadata=minimal;odata.streaming=true',
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/json;odata.metadata=minimal;odata.streaming=true',
      'Authorization': 'Bearer ' + hasToken
    },
    success: function () { },
    failed: function () { },
    error: function () { }
  }
  if (!param.isLoading) hideFullScreenLoading()
  if (param.url === undefined) return console.error('url:' + param.url), hideFullScreenLoading();
  if (param.urlFlage === 'wcs') param.url = window.global_config.wcsURL + param.url
  else if (param.url === '/api/app/stock-out/container-out-pages'  ) param.url = window.global_config.LCURL + param.url
  else if (param.url === '/api/app/stock-out/export-container-out'  ) param.url = window.global_config.LCURL + param.url
  else if (param.url === '/api/app/statistics/device-alarm-pages-old'  ) param.url = window.global_config.LCURL + '/api/app/statistics/device-alarm-pages'
  else  if (param.url === '/api/app/statistics/export-device-alarms-old'  ) param.url = window.global_config.LCURL + '/api/app/statistics/export-device-alarms'
  else param.url = window.global_config.baseURL + param.url

  if (param.method === 'get') param.params = param.data
  else param.data = param.data

  for (const key in param) {
    defaultConfig[key] = param[key]
  }
  axios(defaultConfig).then(function (res) {
    hideFullScreenLoading();
    if (res.status === 200 && res.data.type == 'application/x-xls'||res.data.type =='application/vnd.ms-excel') {
      if (typeof param.success !== 'function') {
        console.error(param.success)
        return false
      } else {
        res.fileName = res.headers['content-disposition'].split(';')[1].split('=')[1];
        param.success(res);
        return;
      }
    }
    if (res.status === 200) {
      if (!res.data.success) {

        // Rcs任务管理 /api/open/agv/AGV-callbac 接口特殊处理
        if (!res.data.error&&!res.data.errorInfo){
           Message({
             message:res.data.message || 'Error',
             type: 'error',
             duration: 5 * 1000
           })
           return
        }
        // wcs任务管理  申请巷道、申请货位 2个接口特殊处理
        if (res.data.errorInfo){
           Message({
             message:res.data.errorInfo.message || 'Error',
             type: 'error',
             duration: 5 * 1000
           })
           return
        }

        const code = parseInt(res.data.error.code)
        if (code === 401) {
          MessageBox.confirm('身份验证失败，您可以取消以停留在此页面，或再次登录', '确认注销', {
            confirmButtonText: '重新登录',
            cancelButtonText: '关闭',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        }else if (code === 403) {
           Message({
              message: res.data.error.message || 'Error',
              type: 'error',
              duration: 2.5 * 1000
            })
            store.dispatch("user/logout").then(() => {
               routes.push({ path: '/login' })
            })
        } 
         else if (code === 500 && param.refreshTokYs) {
          routes.push({
            path: '/login'
          })
          return false
        } else if (code === 500) {
          if (typeof param.error !== 'function') {
            Message({
              message: res.data.error.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          } else {
            if (res.data.error) {
              param.error(res.data)
            }
          }
        } else {
          if (typeof param.error !== 'function') {
            Message({
              message: res.data.error.message || 'Error',
              type: 'error',
              duration: 5 * 1000
            })
          } else {
            if (res.data.error) {
              param.error(res.data)
            }
          }
        }
      }
      else {
        if (typeof param.success !== 'function') {
          console.error(param.success)
          return false
        } else {
          param.success(res.data)
        }
      }
    }

  }).catch(err => {
    hideFullScreenLoading();
    param.error(err)
  })
}

export default request

