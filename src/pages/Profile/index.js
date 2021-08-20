import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'
import UnLogin from './cpn/unlogin'
import Logined from './cpn/logined'
import './index.less'
export default memo(function Profile() {
  //redux
  //获取用户登录状态和信息
  const { isLogin, userInfo } = useSelector(state => {
    return {
      isLogin: state.user.isLogin,
      userInfo: state.user.userInfo
    }
  }, shallowEqual)
  return (
    <div className='profile-container'>
      {/* 判断用户是否登录 登录则展示个人主页 否则展示登录页面 */}
      {!isLogin ? <UnLogin /> : <Logined userInfo={userInfo && userInfo} />}
    </div>
  )
})
