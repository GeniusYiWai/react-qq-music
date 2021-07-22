import request from '../utils/request'

//获取所有电台类型 
export const getDjCate = () => {
  return request.get(`/dj/catelist`)
}
//获取电台详情
//type 电台类型
export const getDjByType = type => {
  return request.get(`dj/recommend/type?type=${type}`)
}
