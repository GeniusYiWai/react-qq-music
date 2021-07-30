import { SET_ALBUM_SONGS, SET_ALBUM_DETAIL } from './constant'
const initState = {
  //专辑详情
  albumDetail: {},
  //专辑下的歌曲
  albumSongs: []
}
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_ALBUM_SONGS:
      return { ...state, ...action.songs }
    case SET_ALBUM_DETAIL:
      return { ...state, ...action.album }
    default:
      return state
  }
}
export default reducer
