import { USER_LOGIN, SHOW_LOGIN_BOX, SET_USER_INFO } from './constant'
import { getItem } from '@/utils/storage'

const initState = {
  //用户是否登录
  isLogin: getItem('login'),
  //是否显示登录弹出层
  showLoginBox: false,
  userInfo: getItem('userInfo')
}
function reducer(state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
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
