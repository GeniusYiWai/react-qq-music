import { SET_CURRENTMUSIC } from './constant'
import { getMusicById } from '@/api/player'

//获取全部排行榜类型 action
const setCurrentPlayMusicAction = music => {
  return {
    type: SET_CURRENTMUSIC,
    music: {
      currentPlayMusic: music
    }
  }
}

//获取全部排行榜类型 dispatch
export const setCurrentPlayMusic = id => {
  return dispatch => {
    getMusicById(id).then(({ data }) => {

      dispatch(setCurrentPlayMusicAction(data.songs[0]))
    })
  }
}
