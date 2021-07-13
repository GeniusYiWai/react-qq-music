import { SET_PLAYLIST_REC, SET_NEWSONG_REC, SET_NEWALBUM_REC } from './constant'

const initState = {
  //歌单推荐state
  playlistRec: [],
  //新歌首发state
  newSongRec: [],
  //新碟上架state
  newAlbumRec: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_PLAYLIST_REC:
      return { ...state, ...action.playlist }
    case SET_NEWSONG_REC:
      return { ...state, ...action.newSong }
    case SET_NEWALBUM_REC:
      return { ...state, ...action.album }
    default:
      return state
  }
}
export default reducer
