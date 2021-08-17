import request from '../utils/request'

//获取video详情
// id video id
export const getVideoDeatil = id => {
  return request.get(`/video/detail?id=${id}`)
}

//获取video播放地址
//id video id
//r 分辨率
export const getVideoUrl = id => {
  return request.get(`/video/url?id=${id}`)
}

//获取相似video
//id video id
export const getSimiVideo = id => {
  return request.get(`/related/allvideo?id=${id}`)
}
