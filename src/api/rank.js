import request from '../utils/request'
//获取所有排行榜类型
/**
 * 
 * @returns 
 */
export const getAllRank = () => {
  return request.get(`/toplist`)
}
//通过排行榜类型获取详情
/**
 * 
 * @param {*} id 排行榜类型
 * @returns 
 */
export const getRankById = id => {
  return request.get(`/playlist/detail?id=${id}`)
}
