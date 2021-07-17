import { SET_CURRENTMUSIC } from './constant'

const initState = {
  //当前播放的音乐url地址 state
  currentPlayMusic: {}
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_CURRENTMUSIC:
      return { ...state, ...action.music }

    default:
      return state
  }
}
export default reducer
