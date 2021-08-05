import React, { memo, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { showLoginBoxDispatch } from '@/pages/Mine/store/actionCreators'
import unLoginBg from '@/assets/img/bg_profile_unlogin.jpg'
import recLogin from '@/assets/img/rec_login.png'
import './index.less'
export default memo(function UnLogin() {
  const dispatch = useDispatch()
  const handleLogin = useCallback(() => {
    dispatch(showLoginBoxDispatch(true))
  }, [])
  return (
    <div
      className='unlogin-container'
      style={{ backgroundImage: `url(${unLoginBg})` }}
    >
      <img src={recLogin} alt='' />
      <button onClick={() => handleLogin()}>立即登录</button>
    </div>
  )
})
