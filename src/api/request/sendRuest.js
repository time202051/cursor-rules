
import request from '@/api/request/request'
import { MessageBox, Message } from 'element-ui'
function clearNullProperty(field) {
  for (let key in field) {
    if (field[key] === '' || field[key] === null || field[key] === undefined ) {
      delete field[key]
    }
  }
  return field;
}
export function get(data) {
  data.method = 'get'
  return new Promise((resolve, reject) => {
    request({
      url: data.url,
      data: clearNullProperty(data.data),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || 'json',
      timeout: data.timeout || 120000,
      success: function (res) {
        resolve(res)
      },
      error: function (res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(res.error)
        }
      }
    })
  })
}
export function post(data) {
  data.method = 'post'
  return new Promise((resolve, reject) => {
    request({
      url: data.url,
      data: clearNullProperty(data.data),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || 'json',
      timeout: data.timeout || 120000,
      success: function (res) {
        resolve(res)
      },
      error: function (res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(res.error)
        }
      }
    })
  })
}
export function del(data) {
  data.method = 'delete'
  return new Promise((resolve, reject) => {
    request({
      url: data.url,
      data:clearNullProperty(data.data),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || 'json',
      timeout: data.timeout || 120000,
      success: function (res) {
        resolve(res)
      },
      error: function (res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(res.error)
        }
      }
    })
  })
}
export function put(data) {
  data.method = 'put'
  return new Promise((resolve, reject) => {
    request({
      url: data.url,
      data: clearNullProperty(data.data),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || 'json',
      timeout: data.timeout || 120000,
      success: function (res) {
        resolve(res)
      },
      error: function (res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(res.error)
        }
      }
    })
  })
}

export function requestS(data) {
  return new Promise((resolve, reject) => {
    request({
      url: data.url,
      data: clearNullProperty(data.data),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || 'json',
      timeout: data.timeout || 120000,
      success: function (res) {
        resolve(res)
      },
      error: function (res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: 'error',
            duration: 5 * 1000
          })
          reject(res.error)
        }
      }
    })
  })
}

export function api(data) {
  return new Promise((resolve, reject) => {
    request({
      isSwagger: true,
      url: data.url,
      data: clearNullProperty(data.data),
      params: clearNullProperty(data.params),
      method: data.method,
      isLoading: data.isLoading || false,
      responseType: data.responseType || "json",
      timeout: data.timeout || 120000,
      success: function(res) {
        resolve(res);
      },
      error: function(res) {
        if (res.error) {
          Message({
            message: res.error.message,
            type: "error",
            duration: 5 * 1000
          });
          reject(res.error);
        }
      }
    });
  });
}

