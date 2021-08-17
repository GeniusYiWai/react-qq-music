import {
  SET_CURRENT_MUSIC,
  SET_MUSIC_STATUS,
  SET_CURRENT_MUSIC_ID,
  SET_CURRENT_PLAYLIST
} from './constant'
import { getMusicById } from '@/api/player'
import {message} from 'antd'
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
//设置当前播放音乐列表 action
const setCurrentPlaylistAction = playlist => {
  return {
    type: SET_CURRENT_PLAYLIST,
    playlist: {
      currentPlaylist: playlist
    }
  }
}
//设置当前播放音乐的信息 dispatch
export const setCurrentPlayMusic = id => {
  return dispatch => {
    getMusicById(id).then(({ data }) => {
      dispatch(setCurrentPlayMusicAction(data.songs[0]))
    }).catch(error=>{
      message.error('播放出错!')
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

//设置当前播放列表
export const setCurrentPlaylist = playlist => {
  return dispatch => {
    dispatch(setCurrentPlaylistAction(playlist))
  }
}
