import { SET_MV_DETAIL, SET_MV_URL, SET_SIMI_MV } from './constant'
const initState = {
  //mv详情
  mvDetail: {},
  //mv 播放地址
  mvUrl: [],
  //相似mv
  simiMv: []
}
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_MV_DETAIL:
      return { ...state, ...action.mv }
    case SET_MV_URL:
      return { ...state, ...action.url }
    case SET_SIMI_MV:
      return { ...state, ...action.mv }
    default:
      return state
  }
}
export default reducer
