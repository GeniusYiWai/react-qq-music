import {
  SET_CURRENT_MUSIC,
  SET_MUSIC_STATUS,
  SET_CURRENT_MUSIC_ID
} from './constant'
import { getMusicById } from '@/api/player'
//设置当前播放音乐的信息 action
const setCurrentPlayMusicAction = music => {
  return {
    type: SET_CURRENT_MUSIC,
    music: {
      currentPlayMusic: music
    }
  }
}
//设置当前播放音乐的id action
const setCurrentPlayMusicIdAction = id => {
  return {
    type: SET_CURRENT_MUSIC_ID,
    id: {
      currentPlayMusicId: id
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
//设置当前播放音乐的状态
export const setCurrentPlayMusicStatus = status => {
  return dispatch => {
    dispatch({
      type: SET_MUSIC_STATUS,
      status
    })
  }
}
//设置当前播放音乐的id
export const setCurrentPlayMusicId = id => {
  return dispatch => {
    dispatch(setCurrentPlayMusicIdAction(id))
  }
}
