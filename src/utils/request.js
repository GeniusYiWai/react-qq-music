import axios from 'axios'
import { message } from 'antd'
import { getItem } from '@/utils/storage'
//区分开发环境
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://autumnfish.cn/'
const request = axios.create({
  //请求根地址
  baseURL,
  //超时时间
  timeout: 15000,
  //跨域请求是否携带token
  withCredentials: true
})
request.interceptors.request.use(
  config => {
    //登录成功后会将cookie存到localstorag中 cookie是登录凭证 后面调用需要登录的接口都需要这个cookie
    //手动将cookie携带到url参数中
    const cookie = getItem('cookie')
    const arr = config.url.split('?')
    if (arr.length === 1) {
      config.url += `?cookie=${cookie}`
    } else {
      config.url += `&cookie=${cookie}`
    }
    return config
  },
  error => {
    return Promise.error(error)
  }
)
request.interceptors.response.use(
  response => {
    // 如果返回的状态码为200
    //802 用户正在扫码登录
    if (response.data.code === 200 || 802) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          message.error({
            content: '请登录后再尝试!',
            duration: 1
          })
          break
        //未登录
        case 301:
          message.error({
            content: '请登录后再尝试!',
            duration: 1
          })
          break
        // 404请求不存在
        // case 404:
        //   message.error({
        //     content: '请求资源不存在!',
        //     duration: 1
        //   })
        //   break
        // case 502:
        //   message.error({
        //     content: '服务器错误!',
        //     duration: 1
        //   })
        //   break
        // 其他错误，直接抛出错误提示
        default:
        // message.error({
        //   content: 'Network Error',
        //   duration: 1
        // })
      }
      return Promise.reject(error.response)
    }
  }
)

export default request
