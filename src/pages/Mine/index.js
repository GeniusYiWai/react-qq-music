import React, { memo } from 'react'
import { useSelector, shallowEqual } from 'react-redux'

import UnLogin from './cpn/unlogin'
import Logined from './cpn/logined'
import './index.less'

export default memo(function Mine() {
  //获取用户登录状态和信息
  const { isLogin, user } = useSelector(state => {
    return {
      isLogin: state.user.isLogin,
      user: state.user.userInfo
    }
  }, shallowEqual)
  return (
    <div className='mine-container'>
      {!isLogin ? <UnLogin /> : <Logined user={user} />}
    </div>
  )
})
