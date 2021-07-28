import { USER_LOGIN, SHOW_LOGIN_BOX } from './constant'

//用户登录 action
const userLoginAction = login => {
  return {
    type: USER_LOGIN,
    login: {
      isLogin: login
    }
  }
}
//展示登录弹出层 action
const showLoginBoxAction = status => {
  return {
    type: SHOW_LOGIN_BOX,
    flag: {
      showLoginBox: status
    }
  }
}

//用户登录 dispatch
export const userLoginDispatch = login => {
  return dispatch => {
    dispatch(userLoginAction(login))
  }
}

//展示登录弹出层 dispatch
export const showLoginBoxDispatch = status => {
  return dispatch => {
    dispatch(showLoginBoxAction(status))
  }
}
