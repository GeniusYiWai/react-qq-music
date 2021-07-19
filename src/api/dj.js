import request from '../utils/request'

//获取电台类型
export const getDjCate = () => {
  return request.get(`/dj/catelist`)
}
//获取电台详情
export const getDjByType = type => {
  return request.get(`dj/recommend/type?type=${type}`)
}
