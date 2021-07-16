import request from '../utils/request'

//获取所有歌单分类
export const getAllPlaylistCate = () => {
  return request.get(`/playlist/highquality/tags`)
}

//获取精品歌单
export const getHighQualityByCate = (cate, limit, before) => {
  return request.get(
    `/top/playlist/highquality?cat=${cate}&limit=${limit}`
  )
}
