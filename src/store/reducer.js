import { combineReducers } from 'redux'
import homeReducer from '../pages/MusicHall/cpn/home/store'
import singerReducer from '../pages/MusicHall/cpn/singer/store'
const cReucer = combineReducers({
  home: homeReducer,
  singer: singerReducer
})
export default cReucer
