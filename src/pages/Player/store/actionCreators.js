import { SET_CURRENTMUSIC } from './constant'
import { getMusicById } from '@/api/player'

//设置当前播放音乐的信息 action
const setCurrentPlayMusicAction = music => {
  return {
    type: SET_CURRENTMUSIC,
    music: {
      currentPlayMusic: music
    }
  }
}

//设置当前播放音乐的信息 dispatch
export const setCurrentPlayMusic = id => {
  return dispatch => {
    getMusicById(id).then(({ data }) => {
      dispatch(setCurrentPlayMusicAction(data.songs[0]))
    })
  }
}
