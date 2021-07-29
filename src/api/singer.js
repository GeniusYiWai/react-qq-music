import request from '../utils/request'
//歌手页面根据条件查询歌手
//type 性别
//area 地区
//initial 姓名首字母
export const getSinger = (area = '', initial = '', type = '') => {
  return request.get(
    `/artist/list?type=${type}&area=${area}&initial=${initial}`
  )
}
//获取歌手热门歌手
//limit 数量
//offset 偏移数量
export const getHotSinger = (limit = '', offset = 1) => {
  return request.get(`/top/artists?limit=${limit}&offset=${offset}`)
}

//获取收藏的歌手
export const getCollectSinger = () => {
  return request.get(`/artist/sublist`)
}
