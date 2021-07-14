import { SET_SINGER_REC } from './constant'

const initState = {
  //歌手数据state
  singerList: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_SINGER_REC:
      return { ...state, ...action.singer }
    default:
      return state
  }
}
export default reducer
