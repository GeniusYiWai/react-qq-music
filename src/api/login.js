import request from '../utils/request'
//md5加密
import md5 from 'js-md5'
// 带上时间戳,防止缓存
const timestamp = new Date().getTime()
//手机号登录
/**
 *
 * @param {*} phoneNumber 手机号
 * @param {*} password 密码
 * @returns
 */
export const loginbByPhone = (phoneNumber, password) => {
  const md5_password = md5(password)
  return request.post(
    `/login/cellphone?phone=${phoneNumber}&md5_password=${md5_password}`
  )
}

//邮箱登录
/**
 *
 * @param {*} email 邮箱
 * @param {*} password 密码
 * @returns
 */
export const loginByEmail = (email, password) => {
  const md5_password = md5(password)
  return request.post(
    `/login?email=${email}@163.com&md5_password=${md5_password}`
  )
}
//二维码登录
//二维码key生成接口
/**
 *
 * @returns
 */
export const getQRKey = () => {
  return request.get(`/login/qr/key?timestamp=${timestamp}`)
}

//二维码生成接口   调用此接口传入上一个接口生成的key可生成二维码图片的base64和二维码信息,或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
/**
 *
 * @param {*} key 二维码key
 * @returns
 */
export const getQRByKey = key => {
  // 带上时间戳,防止缓存
  const timestamp = new Date().getTime()
  return request.get(
    `/login/qr/create?key=${key}&qrimg=true&timestamp=${timestamp}`
  )
}
// 二维码检测扫码状态接口
// 说明: 轮询此接口可获取二维码扫码状态,800为二维码过期,801为等待扫码,802为待确认,803为授权登录成功(803状态码下会返回cookies)
/**
 *
 * @param {*} key 二维码key
 * @returns
 */
export const getQRStatus = key => {
  // 带上时间戳,防止缓存
  const timestamp = new Date().getTime()
  return request.get(`/login/qr/check?key=${key}&timestamp=${timestamp}`)
}

//退出登录
/**
 *
 * @returns
 */
export const logout = () => {
  return request.get(`/logout`)
}
//获取登录状态
/**
 *
 * @returns
 */
export const getLoginStatus = () => {
  return request.get(`/login/status?timestamp=${timestamp}`)
}
