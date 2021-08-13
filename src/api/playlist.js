import request from '../utils/request'

//获取所有歌单分类
export const getAllPlaylistCate = () => {
  return request.get(`/playlist/catlist`)
}

//获取精品歌单
//cate 歌单分类
//limit 条数
// before: 分页参数,取上一页最后一个歌单的 updateTime 获取下一页数据
export const getHighQualityByCate = (cate, limit, offset) => {
  return request.get(
    `/top/playlist?cat=${cate}&limit=${limit}&offset=${offset}`
  )
}
//获取歌单详情
//id 歌单id
export const getPlaylistDeatil = id => {
  return request.get(`/playlist/detail?id=${id}`)
}
