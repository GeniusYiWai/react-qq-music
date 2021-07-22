import { SET_PLAYLIST_CATE, SET_PLAYLIST_BY_CATE } from './constant'
import { getAllPlaylistCate, getHighQualityByCate } from '@/api/playlist'

//获取所有歌单分类 action
const setPlaylistCateAction = playlist => {
  return {
    type: SET_PLAYLIST_CATE,
    playlist: {
      playlistCate: playlist
    }
  }
}
//获取精品歌单通过分类 action
const setPlaylistByCateAction = playlist => {
  return {
    type: SET_PLAYLIST_BY_CATE,
    playlist: {
      playlist
    }
  }
}

//获取所有歌单分类 dispatch
export const setPlaylistCate = () => {
  return dispatch => {
    getAllPlaylistCate().then(({ data }) => {

      dispatch(setPlaylistCateAction(data.tags))
    })
  }
}

//获取精品歌单通过分类 dispatch
export const setPlaylistByCate = ({ cate='全部', limit = 20 }) => {
  return dispatch => {
    getHighQualityByCate(cate, limit).then(({ data }) => {
      dispatch(setPlaylistByCateAction(data.playlists))
    })
  }
}
