/*
  Ajax 请求的工具类，使用的axios进行的操作
*/
import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: { 'x-requested-with': 'xmlhttprequest' },
  transformRequest: [
    (data, headers) => {
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return Object.keys(data).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&')
      } else {
        headers['Content-Type'] = 'application/json;charset=utf-8'
        return JSON.stringify(data)
      }
    }
  ]
})
// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
      // console.log(getToken())
    }
    return config
  },
  error => {
    console.log(error) // for debug
    Message({
      message: error || '请求失败',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (!res.success) {
      if (res.success === undefined) {
        return res
      } else {
        Message({
          message: res.data || '请求服务器错误，请检查。',
          type: 'error',
          duration: 5 * 1000
        })
        return res
      }
    } else {
      if (!res.rows && typeof res.data === 'string') {
        Message({
          message: res.data,
          type: 'success',
          duration: 5 * 1000
        })
      }
      return res
    }
  },
  error => {
    console.log('后台错误提示：' + error) // for debug
    const res = error.response
    if (res.status === 403 && res.data.code === '403') {
      MessageBox.confirm('您没有权限访问该功能，是否重新登录？', '请确认', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.location.href = '/'
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      Message({
        message: error.data.data,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
