import {
  SET_CURRENTMUSIC,
  SET_MUSIC_STATUS,
  SET_CURRENT_MUSIC_LYRIC,
  SET_CURRENT_MUSIC_ID
} from './constant'
const initState = {
  //当前播放的音乐url地址 state
  currentPlayMusic: {},
  //当前播放的音乐的状态
  isPlaying: false,
  //当前播放的音乐的歌词
  lyric: '',
  currentPlayMusicId: null
}
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENTMUSIC:
      return { ...state, ...action.music }
    case SET_MUSIC_STATUS:
      state.isPlaying = action.status
      return { ...state }
    case SET_CURRENT_MUSIC_LYRIC:
      return { ...state, ...action.lyric }
    case SET_CURRENT_MUSIC_ID:
      return { ...state, ...action.id }
    default:
      return state
  }
}
export default reducer
