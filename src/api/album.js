import request from '../utils/request'
// 时间戳,防止缓存
const timestamp = new Date().getTime()
//获取专辑详情
//id 专辑id
export const getAlbumDeatil = id => {
  return request.get(`/album/?id=${id}`)
}
//获取专辑是否收藏
export const getAlbumStatus = id => {
  return request.get(`/album/detail/dynamic?id=${id}&timestamp=${timestamp}`)
}
