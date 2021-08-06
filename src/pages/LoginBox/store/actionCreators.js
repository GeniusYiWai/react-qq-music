import {
  SET_USER_LOGIN_STATUS,
  SHOW_LOGIN_BOX,
  SET_USER_INFO
} from './constant'

//用户登录 action
const userLoginAction = login => {
  return {
    type: SET_USER_LOGIN_STATUS,
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
//设置用户信息 action
const setUserAction = user => {
  return {
    type: SET_USER_INFO,
    user: {
      userInfo: user
    }
  }
}
//用户登录 dispatch
export const userLoginDispatch = login => {
  return dispatch => {
    dispatch(userLoginAction(login))
  }
}

//设置用户信息 dispatch
export const setUserDispatch = profile => {
  return dispatch => {
    dispatch(setUserAction(profile))
  }
}
//展示登录弹出层 dispatch
export const showLoginBoxDispatch = status => {
  return dispatch => {
    dispatch(showLoginBoxAction(status))
  }
}
