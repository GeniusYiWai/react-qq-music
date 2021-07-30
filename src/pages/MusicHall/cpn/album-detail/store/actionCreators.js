import { SET_ALBUM_SONGS, SET_ALBUM_DETAIL } from './constant'
import { getAlbumDeatil } from '@/api/album'

//设置专辑详情 action
const setAlbumDetailAction = album => {
  return {
    type: SET_ALBUM_DETAIL,
    album: {
      albumDetail: album
    }
  }
}

//设置专辑下的歌曲详情 action
const setAlbumSongsAction = songs => {
  return {
    type: SET_ALBUM_SONGS,
    songs: {
      albumSongs: songs
    }
  }
}

//设置歌单详情  dispatch
export const setAlbumDetailDispatch = id => {
  return dispatch => {
    getAlbumDeatil(id).then(({ data }) => {
      dispatch(setAlbumDetailAction(data.album))
      dispatch(setAlbumSongsAction(data.songs))
    })
  }
}
