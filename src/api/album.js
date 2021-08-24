import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()

//获取专辑详情
/**
 * 
 * @param {*} id 专辑id
 * @returns 专辑详情
 */
export const getAlbumDeatil = id => {
  return request.get(`/album/?id=${id}`)
}

/**
 * 
 * @param {*} id 专辑id
 * @returns 专辑是否收藏
 */
export const getAlbumStatus = id => {
  return request.get(`/album/detail/dynamic?id=${id}&timestamp=${timestamp}`)
}

//获取新碟分类
/**
 *
 * @param {*} area 地区
 * @returns
 */
 export const getAlbumByArea = area => {
  return request.get(`/top/album?area=${area}`)
}