import { combineReducers } from 'redux'
import homeReducer from '../pages/MusicHall/cpn/home/store'
const cReucer = combineReducers({
  home: homeReducer
})
export default cReucer
