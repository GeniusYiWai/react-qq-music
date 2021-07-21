import {
  SET_CURRENTMUSIC,
  SET_MUSIC_STATUS,
  SET_CURRENT_MUSIC_LYRIC,
  SET_CURRENT_MUSIC_ID
} from './constant'
import { getMusicById, getLyric } from '@/api/player'

//设置当前播放音乐的信息 action
const setCurrentPlayMusicAction = music => {
  return {
    type: SET_CURRENTMUSIC,
    music: {
      currentPlayMusic: music
    }
  }
}

//设置当前播放音乐的歌词 action
const setCurrentPlayMusicLyricAction = lyric => {
  return {
    type: SET_CURRENT_MUSIC_LYRIC,
    lyric: {
      currentPlayMusicLyric: lyric
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
//设置当前播放音乐的歌词 dispatch
export const setCurrentPlayMusicLyric = id => {
  return dispatch => {
    getLyric(id).then(({ data }) => {
      dispatch(setCurrentPlayMusicLyricAction(data.lrc.lyric))
    })
  }
}

//设置当前播放音乐的id
export const setCurrentPlayMusicId = id => {
  return dispatch => {
    dispatch(setCurrentPlayMusicIdAction(id))
  }
}
