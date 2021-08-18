import request from '../utils/request'

//获取video详情
/**
 *
 * @param {*} id  video id
 * @returns
 */
export const getVideoDeatil = id => {
  return request.get(`/video/detail?id=${id}`)
}

//获取video播放地址
/**
 *
 * @param {*} id video id
 * @returns
 */
export const getVideoUrl = id => {
  return request.get(`/video/url?id=${id}`)
}

//获取相似video
/**
 *
 * @param {*} id video id
 * @returns
 */
export const getSimiVideo = id => {
  return request.get(`/related/allvideo?id=${id}`)
}
