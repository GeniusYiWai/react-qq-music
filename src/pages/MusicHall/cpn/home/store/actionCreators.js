import { SET_PLAYLIST_REC } from './constant'
import { getRecommendPlaylist } from '../../../../../api/home'

const setPlaylistRecAction = list => {
  return {
    type: SET_PLAYLIST_REC,
    playlist:{
      playlistRec:list
    }
  }
}
export const setPlaylistRec = categoryId => {
  return dispatch => {
    getRecommendPlaylist(categoryId).then(({ data }) => {
      dispatch(setPlaylistRecAction(data.response.data.list))
    })
  }
}
