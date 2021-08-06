import { SET_PLAYLIST_DETAIL, SET_PLAYLIST_SONGS } from './constant'
import { getPlaylistDeatil } from '@/api/playlist'
import { getMusicById } from '@/api/player'
//设置歌单详情 action
const setPlaylistDetailAction = playlist => {
  return {
    type: SET_PLAYLIST_DETAIL,
    playlist: {
      playlistDetail: playlist
    }
  }
}
//设置歌单下的所有歌曲 action
const setPlaylistSongsAction = songs => {
  return {
    type: SET_PLAYLIST_SONGS,
    songs: {
      playlistSongs: songs
    }
  }
}
//设置歌单详情  dispatch
export const setPlaylistDetailDispatch = id => {
  return dispatch => {
    getPlaylistDeatil(id).then(({ data: { playlist } }) => {
      dispatch(setPlaylistDetailAction(playlist))
      //获取歌单下的所有歌曲的id
      const trackIds = playlist.trackIds.map(item => item.id).join(',')
      //将歌曲id放在一起请求
      getMusicById(trackIds).then(({ data }) => {
        dispatch(setPlaylistSongsAction(data.songs))
      })
    })
  }
}
