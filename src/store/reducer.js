import { combineReducers } from 'redux'
import homeReducer from '../pages/MusicHall/cpn/home/store'
import singerReducer from '../pages/MusicHall/cpn/singer/store'
import rankReducer from '../pages/MusicHall/cpn/rank/store'
import playlistReducer from '../pages/MusicHall/cpn/playlist/store'
const cReucer = combineReducers({
  home: homeReducer,
  singer: singerReducer,
  rank: rankReducer,
  playlist: playlistReducer
})
export default cReucer
