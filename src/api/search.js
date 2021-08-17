import request from '../utils/request'
//获取热门搜索关键字
export const getHotKeywords = () => {
  return request.get(`/search/hot/detail`)
}
//获取搜索联想建议
//keywords 搜索关键字
export const getSearchSuggest = keywords => {
  return request.get(`/search/suggest?keywords= ${keywords}`)
}
//获取搜索结果
// 必选参数 : keywords : 关键词
// 可选参数 :
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
// type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
export const getSearchResult = ({ keyword, type, limit, offset }) => {
  return request.get(
    `/search/?keywords=${keyword}&type=${type}&limit=${limit}&offset=${offset}`
  )
}
