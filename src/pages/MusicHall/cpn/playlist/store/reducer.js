import { SET_PLAYLIST_CATE, SET_PLAYLIST_BY_CATE } from './constant'

const initState = {
  //所有歌单分类 state
  playlistCate: [],
  //通过分类获取的歌单数据 state
  playlist: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_PLAYLIST_CATE:
      return { ...state, ...action.playlist }
    case SET_PLAYLIST_BY_CATE:
      return { ...state, ...action.playlist }
    default:
      return state
  }
}
export default reducer
