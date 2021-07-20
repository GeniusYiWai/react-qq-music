import {
  SET_CURRENTMUSIC,
  SET_MUSIC_STATUS,
  SET_CURRENTMUSICLYRIC
} from './constant'

const initState = {
  //当前播放的音乐url地址 state
  currentPlayMusic: {},
  //当前播放的音乐的状态
  isPlaying: false,
  //当前播放的音乐的歌词
  lyric: ''
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENTMUSIC:
      return { ...state, ...action.music }
    case SET_MUSIC_STATUS:
      state.isPlaying = action.status
      return { ...state }
    case SET_CURRENTMUSICLYRIC:
      state.lyric = action.lyric
      return { ...state }
    default:
      return state
  }
}
export default reducer
