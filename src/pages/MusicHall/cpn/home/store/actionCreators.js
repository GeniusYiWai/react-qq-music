import { SET_PLAYLIST_REC, SET_NEWSONG_REC, SET_NEWALBUM_REC } from './constant'
import {
  getRecommendPlaylist,
  getRecommendNewSong,
  getRecommendNewAlbum
} from '../../../../../api/home'

//歌单推荐action
const setPlaylistRecAction = list => {
  return {
    type: SET_PLAYLIST_REC,
    playlist: {
      playlistRec: list
    }
  }
}
//新歌首发action
const setNewSongRecAction = newsong => {
  return {
    type: SET_NEWSONG_REC,
    newSong: {
      newSongRec: newsong
    }
  }
}
//新碟上架action
const setNewAlbumRecAction = album => {
  return {
    type: SET_NEWALBUM_REC,
    album: {
      newAlbumRec: album
    }
  }
}
//歌单推荐dispatch
export const setPlaylistRec = categoryId => {
  return dispatch => {
    getRecommendPlaylist(categoryId).then(({ data }) => {
      dispatch(setPlaylistRecAction(data.playlists))
    })
  }
}
//新歌首发dispatch
export const setNewSongRec = categoryId => {
  return dispatch => {
    getRecommendNewSong(categoryId).then(({ data }) => {
      dispatch(setNewSongRecAction(data.data))
    })
  }
}
//新碟上架dispatch
export const setNewAlbumRec = area => {
  return dispatch => {
    getRecommendNewAlbum(area).then(({ data }) => {
      dispatch(setNewAlbumRecAction(data.monthData.splice(0, 20)))
    })
  }
}
