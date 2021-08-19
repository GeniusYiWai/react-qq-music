import {
  SET_USER_LOGIN_STATUS,
  SHOW_LOGIN_BOX,
  SET_USER_INFO
} from './constant'
const initState = {
  //用户是否登录
  isLogin: false,
  //是否显示登录弹出层
  showLoginBox: false,
  //当前登录用户的信息
  userInfo: {}
}
function reducer(state = initState, action) {
  switch (action.type) {
    case SET_USER_LOGIN_STATUS:
      return { ...state, ...action.login }
    case SHOW_LOGIN_BOX:
      return { ...state, ...action.flag }
    case SET_USER_INFO:
      return { ...state, ...action.user }
    default:
      return state
  }
}
export default reducer
