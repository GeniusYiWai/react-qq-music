import { SET_PLAYLISTCATE, SET_PLAYLISTBYCATE } from './constant'

const initState = {
  //所有歌单分类 state
  playlistCate: [],
  //通过分类获取的歌单数据 state
  playlist: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_PLAYLISTCATE:
      return { ...state, ...action.playlist }
    case SET_PLAYLISTBYCATE:
      return { ...state, ...action.playlist }
    default:
      return state
  }
}
export default reducer
