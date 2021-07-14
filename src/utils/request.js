import axios from 'axios'

const request = axios.create({
  //请求根地址
  baseURL:'https://autumnfish.cn/',
  //超时时间
  timeout:5000,
  //跨域请求是否携带token
  withCredentials:true
})

export default request