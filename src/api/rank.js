import request from '../utils/request'
//获取所有排行榜类型
export const getAllRank = () => {
  return request.get(`/toplist`)
}

//通过排行榜类型获取详情
export const getRankById = id => {
  return request.get(`/playlist/detail?id=${id}`)
}
