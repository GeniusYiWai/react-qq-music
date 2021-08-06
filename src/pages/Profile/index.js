import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import UnLogin from './cpn/unlogin'
import Logined from './cpn/logined'
import './index.less'

export default memo(function Profile() {
  //获取用户登录状态和信息
  const { isLogin, userInfo } = useSelector(state => {
    return {
      isLogin: state.user.isLogin,
      userInfo: state.user.userInfo
    }
  }, shallowEqual)
  return (
    <div className='profile-container'>
      {!isLogin ? <UnLogin /> : <Logined userInfo={userInfo} />}
    </div>
  )
})
