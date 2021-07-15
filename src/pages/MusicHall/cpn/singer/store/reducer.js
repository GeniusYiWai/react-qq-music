import { SET_SINGER_REC, SET_HOTSINGER_REC } from './constant'

const initState = {
  //歌手数据state
  singerList: [],
  //热门歌手数据state
  hotSingerList: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_SINGER_REC:
      return { ...state, ...action.singer }
    case SET_HOTSINGER_REC:
      return { ...state, ...action.singer }
    default:
      return state
  }
}
export default reducer
