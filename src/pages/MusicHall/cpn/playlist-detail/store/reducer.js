import { SET_PLAYLIST_DETAIL, SET_PLAYLIST_SONGS } from './constant'

const initState = {
  //歌单详情
  playlistDetail: {},
  //歌单下的所有歌曲
  playlistSongs: []
}
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_PLAYLIST_DETAIL:
      return { ...state, ...action.playlist }
    case SET_PLAYLIST_SONGS:
      return { ...state, ...action.songs }

    default:
      return state
  }
}
export default reducer
