import { SET_ALLRANK_REC, SET_RANKBYID_REC } from './constant'

const initState = {
  //排行榜类型 state
  rankList: [],
  rankDetail: {}
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_ALLRANK_REC:
      return { ...state, ...action.rank }
    case SET_RANKBYID_REC:

      return { ...state, ...action.rank }
    default:
      return state
  }
}
export default reducer
