import { USER_LOGIN, SHOW_LOGIN_BOX } from './constant'
import { getItem } from '@/utils/storage'

const initState = {
  //用户是否登录
  isLogin: getItem('login'),
  //是否显示登录弹出层
  showLoginBox: false
}
function reducer(state = initState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return { ...state, ...action.login }
    case SHOW_LOGIN_BOX:
      return { ...state, ...action.flag }
    default:
      return state
  }
}
export default reducer
