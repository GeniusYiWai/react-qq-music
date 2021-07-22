import { SETDJCATE, SET_DJ_BY_CATE } from './constant'

const initState = {
  //所有歌单分类 state
  djCate: [],
  //通过分类获取的歌单数据 state
  djList: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SETDJCATE:
      return { ...state, ...action.dj }
    case SET_DJ_BY_CATE:
      state.djList.push(action.dj)
      return { ...state }
    default:
      return state
  }
}
export default reducer
