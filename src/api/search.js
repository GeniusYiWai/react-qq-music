import request from '../utils/request'

//获取热门搜索关键字
export const getHotKeywords = () => {
  return request.get(`/search/hot/detail`)
}
//获取搜索联想建议
export const getSearchSuggest = keywords => {
  return request.get(`/search/suggest?keywords= ${keywords}`)
}
