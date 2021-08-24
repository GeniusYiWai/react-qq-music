import request from '../utils/request'
//获取首页推荐歌单
/**
 *
 * @param {*} categoryName 歌单分类
 * @returns
 */
export const getRecommendPlaylist = categoryName => {
  return request.get(`/top/playlist?cat=${categoryName}&limit=25`)
}

//获取首页新歌首发
/**
 *
 * @param {*} id 歌曲类型
 * @returns
 */
export const getRecommendNewSong = id => {
  return request.get(`/top/song?type=${id}`)
}

//获取首页新碟上架
/**
 *
 * @param {*} area 地区
 * @returns
 */
export const getRecommendNewAlbum = (area, limit) => {
  return request.get(`/album/new?area=${area}&limit=${limit}`)
}
//获取首页排行榜
/**
 *
 * @returns
 */
export const getRecommendRank = () => {
  return request.get(`/toplist/detail`)
}
//获取首页MV推荐
/**
 *
 * @param {*} area 地区
 * @returns
 */
export const getRecommendMV = area => {
  return request.get(`/top/mv?area=${area}&limit=40`)
}
