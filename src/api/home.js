import request from '../utils/request'
//获取首页推荐歌单
export const getRecommendPlaylist = categoryName => {
  return request.get(`/top/playlist?cat=${categoryName}&limit=20`)
}

//获取首页新歌首发
//id 类型
export const getRecommendNewSong = id => {
  return request.get(`/top/song?type=${id}`)
}

//获取首页新碟上架
//area 地区
export const getRecommendNewAlbum = area => {
  return request.get(`/top/album?area=${area}`)
}

//获取首页排行榜
export const getRecommendRank = () => {
  return request.get(`/toplist/detail`)
}
//获取首页MV推荐
//area 地区
export const getRecommendMV = area => {
  return request.get(`/top/mv?area=${area}`)
}
