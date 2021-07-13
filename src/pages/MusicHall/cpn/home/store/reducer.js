import { SET_PLAYLIST_REC } from './constant'

const initState = {
  playlistRec: []
}

function reducer(state = initState, action) {
  switch (action.type) {
    case SET_PLAYLIST_REC:
      return { ...state, ...action.playlist }

    default:
      return state
  }
}
export default reducer
