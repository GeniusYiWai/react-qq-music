import { combineReducers } from 'redux'
//主页reducer
import homeReducer from '../pages/MusicHall/cpn/home/store'
//播放器recuder
import playerReducer from '../pages/Player/store'
//dj recuder
import djReducer from '../pages/MusicHall/cpn/dj/store'
//user recuder
import userReducer from '../pages/LoginBox/store/'
const cReucer = combineReducers({
  home: homeReducer,
  player: playerReducer,
  dj: djReducer,
  user: userReducer
})
export default cReucer
