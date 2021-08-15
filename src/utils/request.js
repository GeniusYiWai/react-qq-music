import axios from 'axios'
import { message } from 'antd'
let baseURL
if (process.env.NODE_ENV == 'development') {
  baseURL = 'http://localhost:3200/'
} else if (process.env.NODE_ENV == 'production') {
  baseURL = 'https://autumnfish.cn/'
}
const request = axios.create({
  //请求根地址
  baseURL,
  //超时时间
  timeout: 10000,
  //跨域请求是否携带token
  withCredentials: true
})

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.error(error)
  }
)
request.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.data.code === 200||802) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    console.log(error);
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          message.error({
            content: 'Please log in and try again',
            duration: 1
          })
          break
        // 404请求不存在
        case 404:
          message.error({
            content: 'Request does not exist',
            duration: 1
          })
          break
        case 502:
          message.error({
            content: 'Server Error',
            duration: 1
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          message.error({
            content: 'Network Error',
            duration: 1
          })
      }
      return Promise.reject(error.response)
    }
  }
)

export default request
