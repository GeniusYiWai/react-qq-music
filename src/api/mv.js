import request from '../utils/request'
//根据条件查询mv
// 可选参数 :
// area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
// type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
// order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
// limit: 取出数量 , 默认为 30
// offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
export const getMv = ({
  area = '',
  order = '',
  type = '',
  limit = '',
  offset = 0
}) => {
  return request.get(
    `/mv/all?area=${area}&order=${order}&type=${type}&limit=${limit}&offset=${offset}`
  )
}

//获取mv详情
export const getMvDeatil = id => {
  return request.get(`/mv/detail?mvid=${id}`)
}

//获取mv播放地址
//id mv id
//r 分辨率
export const getMvUrl = (id, r = 1080) => {
  return request.get(`/mv/url?id=${id}&r=${r}`)
}

//获取相似mv
export const getSimiMv = id => {
  return request.get(`simi/mv?mvid=${id}`)
}
