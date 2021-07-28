import { combineReducers } from 'redux'
//主页reducer
import homeReducer from '../pages/MusicHall/cpn/home/store'
//歌手页面reducer
import singerReducer from '../pages/MusicHall/cpn/singer/store'
//排行榜recuder
import rankReducer from '../pages/MusicHall/cpn/rank/store'
//分类歌单 recuder
import playlistReducer from '../pages/MusicHall/cpn/playlist/store'
//播放器recuder
import playerReducer from '../pages/Player/store'
//dj recuder
import djReducer from '../pages/MusicHall/cpn/dj/store'
//mv recuder
import mvReducer from '../pages/MusicHall/cpn/mv/store'
//user recuder
import userReducer from '../pages/Mine/store/'
const cReucer = combineReducers({
  home: homeReducer,
  singer: singerReducer,
  rank: rankReducer,
  playlist: playlistReducer,
  player: playerReducer,
  dj: djReducer,
  mv: mvReducer,
  user: userReducer
})
export default cReucer
