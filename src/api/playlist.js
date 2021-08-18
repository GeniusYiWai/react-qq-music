import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//获取所有歌单分类
/**
 *
 * @returns
 */
export const getAllPlaylistCate = () => {
  return request.get(`/playlist/catlist`)
}

//获取精品歌单
/**
 *
 * @param {*} cate 歌单分类
 * @param {*} limit 条数
 * @param {*} offset 偏移量
 * @returns
 */
export const getHighQualityByCate = (cate, limit, offset) => {
  return request.get(
    `/top/playlist?cat=${cate}&limit=${limit}&offset=${offset}`
  )
}
//获取歌单详情
/**
 *
 * @param {*} id 歌单id
 * @returns
 */
export const getPlaylistDeatil = id => {
  return request.get(`/playlist/detail?id=${id}`)
}

//获取歌单是否收藏
/**
 *
 * @param {*} id 歌单id
 * @returns
 */
export const getPlaylistStatus = id => {
  return request.get(`/playlist/detail/dynamic?id=${id}&timestamp=${timestamp}`)
}
